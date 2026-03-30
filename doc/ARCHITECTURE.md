# English Tutor Backend - Architecture Documentation

## System Design Overview

This document describes the architectural design patterns and decisions made in the English Tutor Backend system.

## 1. High-Level Architecture

### Layered Architecture

\\\
┌────────────────────────────────────────────────────┐
│           Presentation Layer                        │
│    (LiveKit WebRTC, Voice Input/Output)             │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│         Agent Orchestration Layer                   │
│    (LiveKit Agents Framework, Session Handler)      │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│           Business Logic Layer                      │
│  (SessionManager, Voice Agent, Metrics Tracking)    │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│              Service Layer                          │
│  (Database, Latency Tracker, Metrics Collector)     │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│          External Services Layer                    │
│  (MongoDB, AWS S3, Deepgram, OpenAI, Cartesia)      │
└────────────────────────────────────────────────────┘
\\\

## 2. Design Patterns

### 2.1 Factory Pattern
**Used by:** Assistant class
**Purpose:** Create language-specific agents dynamically
\\\python
# Factory creates correct agent based on language
agent = Assistant()._tutor(language="english", ...)
# Extensible for other languages
\\\

### 2.2 Singleton Pattern
**Used by:** SessionManager (per session)
**Purpose:** Ensure single session instance per room
- One SessionManager instance per active conversation
- Manages lifecycle from start to end
- Coordinates all session-related operations

### 2.3 Observer Pattern
**Used by:** Metrics Collection
**Purpose:** React to metric events as they occur
\\\python
# Metrics handler subscribes to session events
session.metrics_collected += on_metrics_collected
\\\

### 2.4 Strategy Pattern
**Used by:** ModelMetrics class
**Purpose:** Different handling for different metric types
\\\python
# Routes metrics to appropriate handler method
if isinstance(metric, TTSMetrics):
    self.tts(metric)
elif isinstance(metric, LLMMetrics):
    self.llm(metric)
\\\

### 2.5 Decorator Pattern
**Used by:** Noise Cancellation
**Purpose:** Add noise cancellation to audio input without modifying core
\\\python
# Wraps audio input with BVC or BVCTelephony
noise_cancellation=lambda params: noise_cancellation.BVC()
\\\

## 3. Data Flow Architecture

### 3.1 Voice Conversation Flow

\\\
User Voice Input (Microphone)
        │
        ▼
┌──────────────────┐
│  Noise Cancel.   │ (Audio Processing)
│  (BVC/Silero)    │
└────────┬─────────┘
         │
         ▼
    ┌────────────┐
    │ VAD        │ (Voice Activity Detection)
    │ (Silero)   │ 
    └────┬───────┘
         │
         ▼
    ┌────────────────┐
    │ STT            │ (Speech-to-Text)
    │ (Deepgram)     │
    └────┬───────────┘
         │
         ▼
    ┌────────────────┐
    │ LLM            │ (Language Understanding)
    │ (OpenAI)       │ (Response Generation)
    └────┬───────────┘
         │
         ▼
    ┌────────────────┐
    │ TTS            │ (Text-to-Speech)
    │ (Cartesia)     │
    └────┬───────────┘
         │
         ▼
    Agent Voice Output (Speakers)
\\\

### 3.2 Data Persistence Flow

\\\
Session Start
    │
    ├─▶ MongoDB: Store Session Metadata
    │   (participant_context, created_at)
    │
    ├─▶ Temp File: Initialize Conversation Log
    │   (session_id, empty conversation_history)
    │
    └─▶ Memory: Initialize Latency Tracker

Conversation Active
    │
    ├─▶ Temp File: Append Conversation Items
    │   (real-time, fast access)
    │
    └─▶ Memory: Buffer Latency Metrics
        (accumulate components)

Session End
    │
    ├─▶ MongoDB: Update Session with Final Metrics
    │   (latency_metrics, statistics)
    │
    ├─▶ AWS S3: Upload Recording
    │   (audio_only MP4 via egress)
    │
    └─▶ File System: Archive/Cleanup
        (temporary conversation log)
\\\

## 4. Component Responsibilities

### 4.1 Main Module (main.py)
**Responsibility:** Orchestration and coordination
- Set up LiveKit server
- Handle session lifecycle
- Initialize all components
- Configure audio pipeline
- Wire event handlers

### 4.2 Voice Agent Component
**Responsibility:** LLM-based conversation
- Receive user input
- Generate contextual responses
- Apply language-specific rules
- Provide tutoring feedback

### 4.3 Session Manager
**Responsibility:** Session lifecycle and coordination
- Manage participant context
- Coordinate component interactions
- Persist session data
- Track session metrics
- Handle cleanup

### 4.4 Database Services
**Responsibility:** Data persistence
- Connection management
- CRUD operations
- Data validation
- Connection pooling

### 4.5 Metrics Components
**Responsibility:** Performance monitoring
- Collect metrics from all components
- Aggregate statistics
- Display formatted reports
- Enable performance analysis

## 5. State Management

### 5.1 Session States

\\\
┌─────────┐
│  IDLE   │ (No active session)
└────┬────┘
     │ start() called
     ▼
┌─────────────────────────┐
│ INITIALIZING            │ (Setting up resources)
└────┬────────────────────┘
     │ setup complete
     ▼
┌─────────────────────────┐
│ ACTIVE                  │ (Conversation ongoing)
│ - Tracking metrics      │
│ - Logging conversation  │
│ - Managing latency      │
└────┬────────────────────┘
     │ end_session() called
     ▼
┌─────────────────────────┐
│ FINALIZING              │ (Cleanup operations)
│ - Persist data          │
│ - Generate reports      │
└────┬────────────────────┘
     │ cleanup complete
     ▼
┌─────────┐
│  IDLE   │ (Back to idle state)
└─────────┘
\\\

### 5.2 Metrics Buffer States

\\\
Empty Buffer
    │
    ├─▶ EOUDelay received → {eou_delay: value}
    │
    ├─▶ LLM_TTFT received → {eou_delay, llm_ttft}
    │
    └─▶ TTS_TTFB received → Complete Sample
        └─▶ Calculate Total
        └─▶ Store Sample
        └─▶ Reset Buffer
\\\

## 6. Configuration Management

### 6.1 Environment-Based Configuration

\\\
.env File (Local)
    │
    └─▶ python-dotenv
        └─▶ os.getenv()
            ├─▶ LiveKit Settings
            ├─▶ MongoDB Settings  
            ├─▶ AWS Settings
            └─▶ API Keys
\\\

### 6.2 Configuration Initialization

\\\python
# Follows 12-Factor App principles
Environment Variables
    │
    ├─▶ Hard-coded defaults for development
    │
    └─▶ Override via Docker/K8s for production
\\\

## 7. Error Handling Architecture

### 7.1 Error Handling Strategy

\\\
Try-Except Blocks
    │
    ├─▶ Connection Errors → Log & Reconnect
    │   (Database, External APIs)
    │
    ├─▶ Metric Processing Errors → Log Only
    │   (Don't interrupt conversation)
    │
    └─▶ Session Errors → Log & Cleanup
        (Graceful shutdown)
\\\

### 7.2 Logging Architecture

\\\
Python Logging Module
    │
    ├─▶ logger.info() → Informational messages
    │
    ├─▶ logger.warning() → Non-critical issues
    │
    └─▶ logger.error() → Error conditions
        └─▶ KMS/logs/ directory
            └─▶ Session-based log files
\\\

## 8. Performance Optimization

### 8.1 Streaming Architecture
- **TTS Audio:** Streamed for faster delivery
- **VAD Processing:** Real-time stream analysis
- **Metrics:** Buffered then batch processed

### 8.2 Caching Strategy
- **VAD Model:** Pre-warmed in prewarm() function
- **Conversation Context:** Kept in memory
- **Session Data:** Lazy loaded from MongoDB

### 8.3 Concurrency Model
- **Async/Await:** All I/O operations non-blocking
- **Event Loop:** Single event loop per session
- **No Thread Blocking:** Ensures responsive agent

## 9. Scalability Considerations

### 9.1 Horizontal Scaling
\\\
Multiple Agent Servers
    ├─▶ Load Balancer (allocates rooms)
    │
    ├─▶ MongoDB Connection Pool
    │   (Shared database)
    │
    └─▶ AWS S3 (Shared storage)
\\\

### 9.2 Session Isolation
- Each session runs independently
- No cross-session data sharing
- Database per MongoDB collection separation

### 9.3 Resource Limits
- VAD model loaded per process (prewarm)
- Connection pooling via MongoClient
- Metric buffer size manageable

## 10. Security Architecture

### 10.1 Credential Management
- Environment variables for secrets
- No hardcoded API keys
- Separate AWS credentials per environment

### 10.2 Data Protection
- MongoDB connection with TLS option
- AWS S3 bucket encryption
- Input validation on all API calls

### 10.3 Access Control
- LiveKit API authentication
- MongoDB connection string validation
- Participant context tracking

## 11. Extension Architecture

### 11.1 Adding New Languages

\\\
1. Create Language Class
   └─▶ src/voice_agent/agents.py
       └─▶ class FrenchTutor(Agent)

2. Create Language Prompt
   └─▶ src/prompt/french.py
       └─▶ def french_prompt(user_info)

3. Update Factory
   └─▶ Assistant._tutor()
       └─▶ Add case for "french"
\\\

### 11.2 Adding Custom Metrics

\\\
1. Define Metric Handler
   └─▶ src/services/metrics.py
       └─▶ def custom_metric(self, metrics)

2. Update Router
   └─▶ ModelMetrics.process_metric()
       └─▶ Add isinstance check

3. Subscribe Handler
   └─▶ main.py
       └─▶ on_metrics_collected()
\\\

---

**Version:** 1.0  
**Last Updated:** March 30, 2026
