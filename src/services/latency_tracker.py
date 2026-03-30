import logging
from datetime import datetime
from typing import Optional, Dict, List


class ConversationLatencyTracker:
    """
    Tracks conversation latency metrics during agent sessions.
    
    Based on LiveKit documentation:
    total_latency = eou.end_of_utterance_delay + llm.ttft + tts.ttfb
    
    Components:
    - EOUMetrics: End-of-utterance detection delay
    - LLMMetrics: Time-to-first-token from LLM
    - TTSMetrics: Time-to-first-byte from TTS
    """
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.latencies: List[float] = []
        self.metrics_buffer: Dict = {}
        self.samples: List[Dict] = []
    
    def track_metric(self, eou_delay: Optional[float] = None, 
                    llm_ttft: Optional[float] = None, 
                    tts_ttfb: Optional[float] = None) -> Optional[Dict]:
        """Accumulate latency components and calculate total when ready."""
        try:
            if eou_delay is not None:
                self.metrics_buffer['eou_delay'] = eou_delay
            if llm_ttft is not None:
                self.metrics_buffer['llm_ttft'] = llm_ttft
            if tts_ttfb is not None:
                self.metrics_buffer['tts_ttfb'] = tts_ttfb
            
            if all(key in self.metrics_buffer for key in ['eou_delay', 'llm_ttft', 'tts_ttfb']):
                return self._calculate_latency_sample()
            
            return None
        except Exception as e:
            self.logger.error(f"Error tracking latency metric: {e}")
            return None
    
    def _calculate_latency_sample(self) -> Dict:
        """Calculate and store latency sample with all components."""
        total_latency = (
            self.metrics_buffer['eou_delay'] + 
            self.metrics_buffer['llm_ttft'] + 
            self.metrics_buffer['tts_ttfb']
        )
        
        latency_sample = {
            "timestamp": datetime.now().isoformat(),
            "total_latency": round(total_latency, 4),
            "components": {
                "eou_delay": round(self.metrics_buffer['eou_delay'], 4),
                "llm_ttft": round(self.metrics_buffer['llm_ttft'], 4),
                "tts_ttfb": round(self.metrics_buffer['tts_ttfb'], 4)
            }
        }
        
        self.latencies.append(total_latency)
        self.samples.append(latency_sample)
        
        self.logger.info(
            f"Latency tracked: total={total_latency:.4f}s "
            f"(eou={latency_sample['components']['eou_delay']}s, "
            f"llm_ttft={latency_sample['components']['llm_ttft']}s, "
            f"tts_ttfb={latency_sample['components']['tts_ttfb']}s)"
        )
        
        self.metrics_buffer = {}
        return latency_sample
    
    def get_statistics(self) -> Dict:
        """Get latency statistics for the session."""
        if not self.latencies:
            return {
                "average_latency": 0.0,
                "min_latency": 0.0,
                "max_latency": 0.0,
                "total_turns": 0
            }
        
        return {
            "average_latency": round(sum(self.latencies) / len(self.latencies), 4),
            "min_latency": round(min(self.latencies), 4),
            "max_latency": round(max(self.latencies), 4),
            "total_turns": len(self.latencies)
        }
    
    def get_samples(self) -> List[Dict]:
        """Get all latency samples."""
        return self.samples
    
    def reset(self) -> None:
        """Reset tracker for a new session."""
        self.latencies = []
        self.metrics_buffer = {}
        self.samples = []
