import os
import json
import logging
import tempfile
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from typing import Optional, Dict, List

from src.services.database import MongoServices
from src.services.latency_tracker import ConversationLatencyTracker

load_dotenv()

class SessionManager:
    """Session Conversation Manager for handling session data storage and retrieval."""

    def __init__(self):
        self.mongo_services = MongoServices(
            url=os.getenv("MONGODB_URI"),
            db=os.getenv("MONGODB_DB_NAME"),
            collection=os.getenv("MONGODB_COLLECTION_NAME")
        )
        self.collection = None  # Lazy initialization - connect on first use
        self.session_id = None
        self.temp_file_path = None
        self.logger = logging.getLogger(__name__)
        self._mongo_initialized = False
        
        # Initialize latency tracker
        self.latency_tracker = ConversationLatencyTracker()
    
    def _ensure_mongo_connected(self) -> None:
        """Ensure MongoDB connection is established (lazy initialization)."""
        if not self._mongo_initialized:
            try:
                self.collection = self.mongo_services.connect()
                self._mongo_initialized = True
            except Exception as e:
                self.logger.error(f"Failed to connect to MongoDB: {e}")
                self.logger.warning("Continuing without MongoDB - session data will not be persisted")
                # Don't raise - allow session to continue without MongoDB
        
    def _ensure_temp_directory(self) -> str:
        """Ensure temp directory exists for session logs."""
        temp_dir = os.path.join(tempfile.gettempdir(), "sessions")
        Path(temp_dir).mkdir(parents=True, exist_ok=True)
        return temp_dir
    
    def start(self, session_id: str, participant_context: dict) -> None:
        """Start a new session by storing session info in MongoDB and initialize temp file."""
        try:
            self.session_id = session_id
            
            # Reset latency tracker for new session
            self.latency_tracker.reset()
            
            # Create temp directory and file for conversation storage
            temp_dir = self._ensure_temp_directory()
            self.temp_file_path = os.path.join(temp_dir, f"chat_{session_id}.json")
            
            # Ensure MongoDB is connected before storing session info
            self._ensure_mongo_connected()
            
            # Store session info (without conversation history) in MongoDB
            if self._mongo_initialized and self.collection is not None:
                session_info = {
                    "session_id": session_id,
                    "participant_context": participant_context,
                    "created_at": datetime.now().isoformat(),
                    "latency_metrics": {
                        "samples": [],
                        "average_latency": 0.0,
                        "min_latency": 0.0,
                        "max_latency": 0.0,
                        "total_turns": 0
                    }
                }
                
                self.collection.insert_one(session_info)
                self.logger.info(f"Session {session_id} info stored in MongoDB.")
            else:
                self.logger.warning(f"MongoDB not available - session {session_id} metadata not persisted")
            
            # Initialize temp file with empty conversation history (always do this)
            temp_data = {
                "session_id": session_id,
                "conversation_history": []
            }
            with open(self.temp_file_path, 'w') as f:
                json.dump(temp_data, f, indent=2)
            self.logger.info(f"Session {session_id} temp file created at: {self.temp_file_path}")
            
        except Exception as e:
            self.logger.error(f"Failed to start session {session_id}: {e}")
            raise

    def track_latency(self, eou_delay: Optional[float] = None, 
                     llm_ttft: Optional[float] = None, 
                     tts_ttfb: Optional[float] = None) -> None:
        """
        Track conversation latency components.
        Delegates to the dedicated latency tracker.
        """
        if not self.session_id:
            self.logger.error("No active session. Call start() first.")
            return
        
        self.latency_tracker.track_metric(eou_delay=eou_delay, llm_ttft=llm_ttft, tts_ttfb=tts_ttfb)

    def get_latency_stats(self) -> Dict:
        """Get latency statistics for the current session."""
        stats = self.latency_tracker.get_statistics()
        stats["samples"] = self.latency_tracker.get_samples()
        return stats

    def session_log(self, log_entry: dict) -> None:
        """Log conversation entry to temp file only during session."""
        if not self.session_id:
            self.logger.error("No active session. Call start() first.")
            return
            
        try:
            # Add timestamp if not present
            if "timestamp" not in log_entry:
                log_entry["timestamp"] = datetime.now().isoformat()
            
            # Update only temp file during session
            self._update_temp_file(log_entry)
            self.logger.info(f"Logged conversation entry for session {self.session_id}.")
            
        except Exception as e:
            self.logger.error(f"Failed to log conversation for session {self.session_id}: {e}")
            raise

    def _update_temp_file(self, log_entry: dict) -> None:
        """Update the temp file with new log entry."""
        if not self.temp_file_path or not os.path.exists(self.temp_file_path):
            self.logger.error(f"Temp file not found: {self.temp_file_path}")
            return
            
        try:
            with open(self.temp_file_path, 'r') as f:
                session_data = json.load(f)
            
            session_data["conversation_history"].append(log_entry)
            session_data["updated_at"] = datetime.now().isoformat()
            
            with open(self.temp_file_path, 'w') as f:
                json.dump(session_data, f, indent=2)
                
        except Exception as e:
            self.logger.error(f"Failed to update temp file: {e}")
            raise

    def get_session_logs(self) -> list:
        """Retrieve all logs from the current session's temp file."""
        if not self.temp_file_path or not os.path.exists(self.temp_file_path):
            self.logger.error(f"Temp file not found: {self.temp_file_path}")
            return []
            
        try:
            with open(self.temp_file_path, 'r') as f:
                session_data = json.load(f)
            return session_data.get("conversation_history", [])
        except Exception as e:
            self.logger.error(f"Failed to read session logs from temp file: {e}")
            return []

    def end_session(self) -> None:
        """End session: store all conversation and latency metrics from temp file to MongoDB and cleanup."""
        if not self.session_id:
            self.logger.warning("No active session to end.")
            return
            
        try:
            # Read all conversation history from temp file
            conversation_history = self.get_session_logs()
            
            # Get latency statistics
            latency_stats = self.get_latency_stats()
            
            # Store all conversation and latency metrics in MongoDB (if available)
            if self._mongo_initialized and self.collection is not None:
                self.collection.update_one(
                    {"session_id": self.session_id},
                    {
                        "$set": {
                            "conversation_history": conversation_history,
                            "samples": latency_stats.get("samples", []),
                            "average_latency": latency_stats.get("average_latency", 0.0),
                            "min_latency": latency_stats.get("min_latency", 0.0),
                            "max_latency": latency_stats.get("max_latency", 0.0),
                            "total_turns": latency_stats.get("total_turns", 0),
                            "session_ended": True,
                            "ended_at": datetime.now().isoformat()
                        }
                    }
                )
                self.logger.info(
                    f"Session {self.session_id} ended. "
                    f"Stored {len(conversation_history)} messages "
                    f"with average latency: {latency_stats.get('average_latency', 0.0):.4f}s"
                )
            else:
                self.logger.warning(
                    f"Session {self.session_id} ended but not persisted to MongoDB. "
                    f"Conversation logs ({len(conversation_history)} messages) are available in temp file only."
                )
            
            # Clean up temp file
            self.cleanup_temp_file()
            
        except Exception as e:
            self.logger.error(f"Failed to end session {self.session_id}: {e}")
            raise

    def cleanup_temp_file(self) -> None:
        """Delete the temp file after session is complete."""
        if self.temp_file_path and os.path.exists(self.temp_file_path):
            try:
                os.remove(self.temp_file_path)
                self.logger.info(f"Temp file deleted: {self.temp_file_path}")
            except Exception as e:
                self.logger.error(f"Failed to delete temp file: {e}")