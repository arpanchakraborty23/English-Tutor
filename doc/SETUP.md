# English Tutor Backend - Setup Guide

Complete step-by-step guide to set up and run the English Tutor Backend project.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Development Environment Setup](#development-environment-setup)
3. [Dependencies Installation](#dependencies-installation)
4. [External Services Configuration](#external-services-configuration)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Running the Application](#running-the-application)
8. [Docker Deployment](#docker-deployment)
9. [Troubleshooting](#troubleshooting)
10. [Verification Checklist](#verification-checklist)

## System Requirements

### Minimum Requirements
- **OS:** Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **CPU:** 2 cores minimum
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 2GB available

### Software Requirements
- **Python:** 3.14 or higher
- **Git:** Latest version
- **Package Manager:** pip or conda

### Verify Python Installation
\\\ash
python --version  # Should show Python 3.14+
pip --version     # Should show pip version
\\\

## Development Environment Setup

### Step 1: Clone Repository

\\\ash
git clone <repository-url>
cd English-Tutor/Backend
\\\

### Step 2: Create Virtual Environment

#### Windows (PowerShell)
\\\powershell
python -m venv venv
.\\venv\\Scripts\\activate
\\\

#### Windows (Command Prompt)
\\\cmd
python -m venv venv
venv\\Scripts\\activate.bat
\\\

#### macOS/Linux
\\\ash
python3 -m venv venv
source venv/bin/activate
\\\

### Step 3: Verify Virtual Environment

\\\ash
# Should show path to venv Python
which python  # macOS/Linux
where python  # Windows
\\\

## Dependencies Installation

### Option A: Install from pyproject.toml (Recommended)

\\\ash
# With virtual environment activated
pip install -e .
\\\

### Option B: Install Individual Packages

\\\ash
pip install python-dotenv>=1.2.2
pip install "livekit-agents[silero,turn-detector]~=1.4"
pip install livekit-plugins-noise-cancellation~=0.2
pip install pymongo>=4.16.0
\\\

### Verify Installation

\\\ash
pip list
# Should show:
# python-dotenv
# livekit-agents
# livekit-plugins-noise-cancellation
# pymongo
\\\

## External Services Configuration

### 1. LiveKit Setup

#### 1.1 Create LiveKit Project
- Go to [LiveKit Studio](https://studio.livekit.io)
- Sign up or log in
- Create a new project
- Copy credentials

#### 1.2 Get API Credentials
\\\
API Key: <your-api-key>
API Secret: <your-api-secret>
WebRTC URL: wss://<your-domain>
\\\

### 2. MongoDB Configuration

#### 2.1 Local MongoDB (Development)
\\\ash
# Install MongoDB Community Edition
# Then start MongoDB service

# Windows (if installed via MSI)
net start MongoDB

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod
\\\

#### 2.2 MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account or log in
3. Create free tier cluster
4. Get connection string: mongodb+srv://user:pass@cluster.mongodb.net

#### 2.3 Verify Connection
\\\ash
# Install MongoDB CLI tools (optional)
pip install pymongo

# Test connection with Python
python -c "from pymongo import MongoClient; 
client = MongoClient('<your-connection-string>'); 
print('Connected!' if client.admin.command('ping') else 'Failed')"
\\\

### 3. AWS S3 Configuration

#### 3.1 Create AWS Account
- Go to [AWS Console](https://console.aws.amazon.com)
- Sign up or log in

#### 3.2 Create S3 Bucket
1. Navigate to S3 service
2. Click "Create bucket"
3. Name: english-tutor-recordings (or choose name)
4. Region: Select your region
5. Click "Create"

#### 3.3 Generate Access Keys
1. Navigate to IAM service
2. Click "Users" in left sidebar
3. Create new user or use existing
4. Generate access key
5. Copy Key ID and Secret

#### 3.4 S3 Bucket Policy (Optional but Recommended)
\\\json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR-ACCOUNT-ID:user/YOUR-USER"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::english-tutor-recordings/*"
    }
  ]
}
\\\

### 4. AI Service API Keys

#### 4.1 OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API keys
4. Create new key
5. Copy key (sk-xxx...)

#### 4.2 Deepgram API Key
1. Go to [Deepgram Console](https://console.deepgram.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create new key
5. Copy key

#### 4.3 Cartesia API Key
1. Go to [Cartesia Dashboard](https://dashboard.cartesia.ai)
2. Sign up or log in
3. Navigate to API Keys
4. Create new key and get Model ID
5. Copy both

## Environment Variables

### Step 1: Create .env File

In project root directory, create file named .env:

\\\ash
# Linux/macOS
touch .env
cat > .env << 'EOF'
# LiveKit Configuration
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=your-api-key-here
LIVEKIT_API_SECRET=your-api-secret-here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=english_tutor
MONGODB_COLLECTION_NAME=sessions

# AWS Configuration
AWS_BUCKET_NAME=english-tutor-recordings
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here

# AI Service Keys
OPENAI_API_KEY=sk-your-key-here
DEEPGRAM_API_KEY=your-deepgram-key-here
CARTESIA_API_KEY=your-cartesia-key-here
CARTESIA_MODEL_ID=9626c31c-bec5-4cca-baa8-f8ba9e84c8bc
EOF
\\\

### Step 2: Windows PowerShell Alternative

\\\powershell
 = @"
# LiveKit Configuration
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=your-api-key-here
LIVEKIT_API_SECRET=your-api-secret-here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=english_tutor
MONGODB_COLLECTION_NAME=sessions

# AWS Configuration
AWS_BUCKET_NAME=english-tutor-recordings
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here

# AI Service Keys
OPENAI_API_KEY=sk-your-key-here
DEEPGRAM_API_KEY=your-deepgram-key-here
CARTESIA_API_KEY=your-cartesia-key-here
CARTESIA_MODEL_ID=9626c31c-bec5-4cca-baa8-f8ba9e84c8bc
