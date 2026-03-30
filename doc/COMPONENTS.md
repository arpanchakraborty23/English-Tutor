# English Tutor Backend - Component Documentation

## Overview
This document provides detailed information about all components and classes used in the English Tutor Backend project. Each component is documented with its purpose, key methods, and usage examples.

---

## 1. Voice Agent Components

### 1.1 \Assistant\ Class
**Location:** \src/voice_agent/agents.py\

**Purpose:** Factory class for creating language-specific tutor agents.

**Key Methods:**
- \_tutor(language, instructions, initial_ctx)\ - Static method that creates appropriate agent based on language

**Usage:**
\\\python
from src.voice_agent.agents import Assistant
from src.prompt.english import english_prompt

# Create an English tutor agent
agent = Assistant()._tutor(
    language="english",
    instructions=english_prompt(user_info="name:Arpan,age:30,english_level:beginner"),
    initial_ctx=None
)
\\\

---

## 2. Session Management Components

### 2.1 \SessionManager\ Class
**Location:** \src/services/session.py\

**Purpose:** Manages conversation sessions, tracking participant context, and storing session data in MongoDB.

**Key Methods:**
- \start(session_id, participant_context)\ - Initializes a new session
- \	rack_latency(eou_delay, llm_ttft, tts_ttfb)\ - Tracks latency components
- \session_log(log_entry)\ - Logs conversation entries
- \get_latency_stats()\ - Retrieves latency statistics
- \end_session()\ - Finalizes session

---

## 3. Database Components

### 3.1 \MongoServices\ Class
**Location:** \src/services/database.py\

**Purpose:** Manages MongoDB connection lifecycle and operations.

**Key Methods:**
- \connect()\ - Establishes database connection
- \insert_one(document)\ - Inserts single document
- \disconnect()\ - Closes connection

---

## 4. Metrics Components

### 4.1 \ModelMetrics\ Class
**Location:** \src/services/metrics.py\

**Purpose:** Handles collection and display of all LiveKit agent metrics.

**Supported Metrics:**
- TTS Metrics (Text-to-Speech)
- STT Metrics (Speech-to-Text)
- LLM Metrics (Language Model)
- VAD Metrics (Voice Activity Detection)
- EOUMetrics (End-of-Utterance)

---

## 5. Latency Tracking

### 5.1 \ConversationLatencyTracker\ Class
**Location:** \src/services/latency_tracker.py\

**Purpose:** Specialized tracker for conversation latency components.

**Latency Formula:**
\	otal_latency = eou_delay + llm_ttft + tts_ttfb\

---

## 6. External Services Configuration

**STT:** Deepgram Nova-3 (multilingual)
**LLM:** OpenAI GPT-4.1 Mini
**TTS:** Cartesia Sonic-3
**VAD:** Silero Voice Activity Detection
**Database:** MongoDB
**Storage:** AWS S3

---

**Version:** 1.0
**Last Updated:** March 30, 2026
