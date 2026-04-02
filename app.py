import os
from pathlib import Path

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from livekit import api

BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"

app = FastAPI(title="English Tutor Frontend API")

app.mount("/templates", StaticFiles(directory=TEMPLATES_DIR), name="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConversationStartRequest(BaseModel):
    language: str
    reason: str
    reason_type: str
    level: str
    conversation_examples: str = ""


@app.get("/", include_in_schema=False)
async def home():
    return FileResponse(TEMPLATES_DIR / "conversation_setup.html")


@app.post("/api/conversation/start")
async def start_conversation(payload: ConversationStartRequest):
    api_key = os.getenv('LIVEKIT_API_KEY')
    api_secret = os.getenv('LIVEKIT_API_SECRET')
    server_url = os.getenv('LIVEKIT_URL')

    if not all([api_key,api_secret,server_url]):
        return HTTPException(
            status_code=500,
            detail="LiveKit API credentials are not set in environment variables."
        )
    
    token = api.AccessToken(api_key, api_secret) 
    token.with_grants(api.VideoGrants(room_join=True))
    token.with_metadata(payload.model_dump_json())
    token = token.to_jwt()
    return {
        "token": token

    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
