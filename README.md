# English Tutor Backend

A powerful AI-driven voice conversation system for personalized English language tutoring built with LiveKit Agents.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Performance Metrics](#performance-metrics)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

This backend service provides an intelligent English tutoring experience through real-time voice conversations. It leverages cutting-edge AI technologies including:
- **Voice Recognition:** Deepgram Nova-3
- **Language Generation:** OpenAI GPT-4.1 Mini
- **Voice Synthesis:** Cartesia Sonic-3
- **Conversation Management:** LiveKit Agents Framework

The system is designed to adapt to students of all proficiency levels, from beginners to advanced learners, providing personalized feedback and engaging learning experiences.

## Key Features

### 🎯 Adaptive Learning
- Automatic proficiency level assessment
- Dynamic difficulty adjustment based on student performance
- Personalized learning paths tailored to individual needs

### 🗣️ Advanced Voice Processing
- Real-time speech recognition with high accuracy
- Natural voice synthesis for realistic responses
- Intelligent voice activity detection (VAD)
- Automatic turn detection for natural conversation flow

### 📊 Comprehensive Metrics & Monitoring
- End-to-end latency tracking
- Performance metrics for each AI component (STT, LLM, TTS)
- Session analytics and conversation statistics
- Real-time metric visualization

### 💾 Robust Data Management
- MongoDB-based session storage
- AWS S3 integration for recording backup
- Conversation history persistence
- Latency component tracking

### 🌐 Multi-Component Integration
- Seamless integration with LiveKit infrastructure
- Real-time egress for recording management
- Participant context preservation
- SIP telephone support with noise cancellation

## System Architecture

`
┌─────────────────────────────────────┐
│      Frontend / Client Layer        │
│   (Voice Input/Output Device)       │
└────────────────┬────────────────────┘
                 │ WebRTC Audio Stream
                 ▼
┌─────────────────────────────────────┐
│     LiveKit Agent Server            │
│  - Session Management               │
│  - Audio Streaming                  │
│  - Room Management                  │
└────────────────┬────────────────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│ Agent  │  │Session │  │Metrics │
│Manager │  │Manager │  │Tracker │
└────────┘  └────────┘  └────────┘
    │            │            │
    └────────────┼────────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌──────────┐ ┌────────┐  ┌─────────┐
│ Deepgram │ │ OpenAI │  │Cartesia │
│ (STT)    │ │(LLM)   │  │ (TTS)   │
└──────────┘ └────────┘  └─────────┘
    │            │            │
    └────────────┼────────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌─────────┐
│MongoDB │  │AWS S3  │  │Silero   │
│        │  │        │  │VAD      │
└────────┘  └────────┘  └─────────┘
`

## Technology Stack

### Core Framework
- **LiveKit Agents** - Agent orchestration and real-time communication
- **Python 3.14+** - Primary programming language
- **AsyncIO** - Asynchronous operations

### AI/ML Services
| Service | Provider | Model | Purpose |
|---------|----------|-------|---------|
| Speech-to-Text | Deepgram | Nova-3:multi | Multilingual speech recognition |
| Language Model | OpenAI | GPT-4.1 Mini | Intelligent tutoring responses |
| Text-to-Speech | Cartesia | Sonic-3 | Natural voice synthesis |
| Voice Activity Detection | Silero | Built-in | Detect user speech |

### Infrastructure
- **MongoDB** - Session and conversation storage
- **AWS S3** - Recording and backup storage
- **LiveKit Server** - Real-time communication backend

### Dependencies
`python
python-dotenv>=1.2.2
livekit-agents[silero,turn-detector]~=1.4
livekit-plugins-noise-cancellation~=0.2
pymongo>=4.16.0
`

## Quick Start

### Prerequisites
- Python 3.14 or higher
- MongoDB database (local or cloud)
- AWS S3 bucket for recordings
- API keys for:
  - OpenAI GPT-4.1
  - Deepgram Nova-3
  - Cartesia TTS
  - LiveKit

### Installation

1. **Clone Repository**
   \\\ash
   git clone <repository-url>
   cd English-Tutor/Backend
   \\\

2. **Create Virtual Environment**
   \\\ash
   python -m venv venv
   # Windows
   .\\venv\\Scripts\\activate
   # macOS/Linux
   source venv/bin/activate
   \\\

3. **Install Dependencies**
   \\\ash
   pip install -e .
   \\\

4. **Configure Environment**
   Copy `.env.example` to `.env` and fill in the values:
   \\\ash
   cp .env.example .env
   \\\

   Required variables:
   \\\
   # LiveKit Configuration
   LIVEKIT_URL=<your-livekit-url>
   LIVEKIT_API_KEY=<your-api-key>
   LIVEKIT_API_SECRET=<your-api-secret>

   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
   MONGODB_DB_NAME=english_tutor
   MONGODB_COLLECTION_NAME=sessions

   # AWS Configuration
   AWS_BUCKET_NAME=<your-bucket-name>
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=<your-access-key>
   AWS_SECRET_ACCESS_KEY=<your-secret-key>

   # AI Service Keys
   OPENAI_API_KEY=<your-openai-key>
   DEEPGRAM_API_KEY=<your-deepgram-key>
   CARTESIA_API_KEY=<your-cartesia-key>
   \\\

5. **Run Token API**
   \\\ash
   uvicorn app:app --host 127.0.0.1 --port 8000 --reload
   \\\

6. **Run Agent Worker**
   \\\ash
   python main.py
   \\\

### Token Endpoint

The frontend voice session now uses the LiveKit-standard token endpoint format documented at:
- `POST /api/token`
- request fields: `room_name`, `participant_identity`, `participant_name`, `participant_metadata`, `participant_attributes`, `room_config`
- response fields: `server_url`, `participant_token`

The FastAPI implementation lives in `app.py`. Learner-specific practice information is attached during token creation through:
- `participant_metadata`: full JSON payload for the tutor
- `participant_attributes`: compact key/value fields like `language`, `level`, and `reason`

The older compatibility route `POST /api/conversation/start` is still available, but the frontend now prefers `/api/token`.

## Project Structure

\\\
English-Tutor/Backend/
├── main.py                          # Entry point for agent server
├── pyproject.toml                   # Project configuration
├── Dockerfile                       # Docker container setup
├── README.md                        # This file
├── .env                             # Environment variables (not in repo)
├── doc/                             # Documentation
│   └── COMPONENTS.md               # Detailed component documentation
├── KMS/                             # Key management system
│   └── logs/                        # Logging directory
├── src/
│   ├── __init__.py
│   ├── prompt/                      # Prompt templates
│   │   ├── __init__.py
│   │   └── english.py              # English tutor system prompt
│   ├── services/                    # Business logic services
│   │   ├── __init__.py
│   │   ├── database.py             # MongoDB operations
│   │   ├── session.py              # Session management
│   │   ├── latency_tracker.py      # Latency metrics tracking
│   │   └── metrics.py              # Metric collection and display
│   ├── voice_agent/                 # Agent implementations
│   │   ├── __init__.py
│   │   └── agents.py               # Agent classes
│   └── utils/                       # Utility functions
│       └── __init__.py
└── recordings/                      # Audio recording output
`

## Configuration

### Environment Variables Reference

\\\env
# LiveKit Configuration
LIVEKIT_URL=ws://localhost:7880           # LiveKit server URL
LIVEKIT_API_KEY=your-api-key              # LiveKit API key
LIVEKIT_API_SECRET=your-api-secret        # LiveKit API secret

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017     # MongoDB connection string
MONGODB_DB_NAME=english_tutor             # Database name
MONGODB_COLLECTION_NAME=sessions          # Collection name

# AWS S3 Configuration
AWS_BUCKET_NAME=english-tutor-recordings  # S3 bucket for audio
AWS_REGION=us-east-1                      # AWS region
AWS_ACCESS_KEY_ID=your-access-key         # AWS access key
AWS_SECRET_ACCESS_KEY=your-secret-key     # AWS secret key

# AI Service Keys
OPENAI_API_KEY=sk-...                     # OpenAI API key
DEEPGRAM_API_KEY=your-deepgram-key        # Deepgram API key
CARTESIA_API_KEY=your-cartesia-key        # Cartesia API key
CARTESIA_MODEL_ID=9626c31c-...           # Cartesia model ID
\\\

## Components

### 1. Voice Agent (src/voice_agent/agents.py)
- **Assistant Factory:** Creates language-specific agents
- **EnglishTutor:** Implements English tutoring logic
- Inherits from LiveKit Agent with custom instructions

### 2. Session Manager (src/services/session.py)
- Manages participant context and session lifecycle
- Stores session data in MongoDB
- Maintains temporary conversation history
- Tracks latency metrics

### 3. Database Services (src/services/database.py)
- MongoDB connection management
- Credentials validation
- Document insertion and retrieval
- Automatic reconnection handling

### 4. Metrics Collector (src/services/metrics.py)
- Collects all LiveKit agent metrics
- Displays metrics in formatted tables
- Supports:
  - TTS metrics (Text-to-Speech)
  - STT metrics (Speech-to-Text)
  - LLM metrics (Language Model)
  - VAD metrics (Voice Activity Detection)
  - EOUMetrics (End-of-Utterance)

### 5. Latency Tracker (src/services/latency_tracker.py)
- Tracks conversation latency components
- Calculates total latency from components
- Provides aggregated statistics

For detailed component documentation, see [doc/COMPONENTS.md](doc/COMPONENTS.md).

## Usage Examples

### Starting a Tutoring Session

\\\python
from src.voice_agent.agents import Assistant
from src.prompt.english import english_prompt
from src.services.session import SessionManager

# Create agent
agent = Assistant()._tutor(
    language="english",
    instructions=english_prompt(user_info="name:John,age:25,english_level:intermediate"),
    initial_ctx=None
)

# Manage session
session_manager = SessionManager()
session_manager.start("room_001", {
    "identity": "user_123",
    "name": "John",
    "age": 25,
    "english_level": "intermediate"
})
\\\

### Tracking Latency

\\\python
# Track latency components as they arrive
session_manager.track_latency(eou_delay=0.5)
session_manager.track_latency(llm_ttft=0.3)
latency_sample = session_manager.track_latency(tts_ttfb=0.2)

# Get statistics
stats = session_manager.get_latency_stats()
print(f"Average Latency: {stats['average_latency']}s")
\\\

### Processing Metrics

\\\python
from src.services.metrics import ModelMetrics

model_metrics = ModelMetrics()

# Process metrics as they arrive
model_metrics.process_metric(tts_metrics)
model_metrics.process_metric(llm_metrics)

# Print summary
model_metrics.print_summary()
\\\

## Performance Metrics

### Latency Components Formula
\\\
Total Conversation Latency = EOUDelay + LLM_TTFT + TTS_TTFB

Where:
- EOUDelay: End-of-utterance detection delay (VAD)
- LLM_TTFT: Time-to-first-token from language model
- TTS_TTFB: Time-to-first-byte from text-to-speech
\\\

### Expected Metrics
| Component | Typical Range | Target |
|-----------|---------------|--------|
| EOUDelay | 200-600ms | < 500ms |
| LLM_TTFT | 100-500ms | < 300ms |
| TTS_TTFB | 50-200ms | < 100ms |
| **Total** | **350-1300ms** | **< 900ms** |

## Database Schema

### Sessions Collection (MongoDB)
\\\json
{
  "_id": ObjectId,
  "session_id": "room_001",
  "participant_context": {
    "identity": "user_123",
    "name": "John Doe",
    "age": 25,
    "english_level": "intermediate"
  },
  "created_at": "2024-03-30T10:30:00.000Z",
  "latency_metrics": {
    "samples": [
      {
        "timestamp": "2024-03-30T10:30:05.000Z",
        "total_latency": 1.0,
        "components": {
          "eou_delay": 0.5,
          "llm_ttft": 0.3,
          "tts_ttfb": 0.2
        }
      }
    ],
    "average_latency": 1.0,
    "min_latency": 0.9,
    "max_latency": 1.1,
    "total_turns": 5
  }
}
\\\

## Docker Deployment

Build Docker image:
\\\ash
docker build -t english-tutor-backend:latest .
\\\

Run container:
\\\ash
docker run -d \\
  --name english-tutor \\
  -p 8081:8081 \\
  --env-file .env \\
  english-tutor-backend:latest
\\\

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Verify MONGODB_URI is correct
- Check network connectivity to MongoDB
- Ensure IP whitelist includes server IP

**2. API Key Errors**
- Verify all AI service API keys are valid
- Check API key expiration dates
- Ensure sufficient credit/usage limits

**3. Audio Quality Issues**
- Check microphone input levels
- Verify noise cancellation is functioning
- Increase VAD confidence threshold if needed

**4. High Latency**
- Check network connection quality
- Review AI service response times
- Verify server resources (CPU, memory)

## Contributing

To contribute to this project:

1. Create feature branch: \git checkout -b feature/your-feature\
2. Commit changes: \git commit -am 'Add your feature'\
3. Push to branch: \git push origin feature/your-feature\
4. Submit pull request

## License

This project is proprietary and confidential.

---

## Support

For issues, questions, or suggestions:
- 📧 Email: support@englishtutor.com
- 🐛 Bug Reports: GitHub Issues
- 📖 Documentation: See doc/ folder

---

**Version:** 1.0.0  
**Last Updated:** March 30, 2026  
**Maintained By:** English Tutor Development Team
