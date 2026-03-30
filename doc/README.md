# Documentation Index

Welcome to the English Tutor Backend documentation. This folder contains comprehensive guides and reference materials.

## Documentation Files

### 1. COMPONENTS.md
Detailed Component Reference

Complete documentation of all components, classes, and services used in the project:
- Voice Agent Components (Assistant, EnglishTutor)
- Session Management (SessionManager, ConversationLatencyTracker)
- Database Services (MongoServices, MongoDBValidation)
- Metrics Collection (ModelMetrics)
- Prompt System (english_prompt)
- LiveKit Agent Configuration
- Data Models and schemas
- Error Handling strategies

**Best for:** Understanding how individual components work and their APIs

---

### 2. ARCHITECTURE.md
System Design & Architecture

High-level architectural overview and design patterns:
- System design overview with layered architecture
- Design patterns (Factory, Singleton, Observer, Strategy, Decorator)
- Data flow diagrams
- Component responsibilities
- State management
- Configuration management
- Error handling architecture
- Performance optimization strategies
- Scalability considerations
- Security architecture
- Extension points for customization

**Best for:** Understanding how the system is organized and why design decisions were made

---

### 3. SETUP.md
Installation & Configuration Guide

Step-by-step guide to set up the project from scratch:
- System requirements
- Development environment setup
- Dependencies installation
- External services configuration
  - LiveKit setup
  - MongoDB configuration
  - AWS S3 setup
  - AI service API keys
- Environment variables reference
- Database setup with indexes
- Running the application
- Docker deployment
- Troubleshooting common issues
- Verification checklist

**Best for:** Getting the project running on your machine for development or deployment

---

## Quick Navigation

### I want to...

**...run the project locally**
Start with SETUP.md

**...understand how a specific component works**
Check COMPONENTS.md

**...know why the system is designed this way**
Read ARCHITECTURE.md

**...add a new feature/component**
Read ARCHITECTURE.md then COMPONENTS.md

**...troubleshoot an issue**
See Troubleshooting section in SETUP.md

---

## Documentation Structure

doc/
|- README.md              (Documentation Index)
|- COMPONENTS.md          (Component Reference)
|- ARCHITECTURE.md        (System Design)
|- SETUP.md              (Installation Guide)

---

## Support

If you find unclear documentation, missing information, or errors,
please report them to help improve the documentation.

---

Documentation Version: 1.0
Last Updated: March 30, 2026
