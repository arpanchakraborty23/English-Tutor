import os
from uuid import uuid4
from pathlib import Path
from dotenv import load_dotenv

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from livekit import api

load_dotenv()  # Load environment variables from .env file
BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"
FRONTEND_DIST_DIR = BASE_DIR / "frontend_dist"

app = FastAPI(title="English Tutor Frontend API")

app.mount("/templates", StaticFiles(directory=TEMPLATES_DIR), name="templates")

if (FRONTEND_DIST_DIR / "assets").exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST_DIR / "assets"), name="assets")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConversationStartRequest(BaseModel):
    user_name: str = ""
    age: int | None = None
    native_language: str = ""
    language: str
    reason: str
    reason_type: str
    level: str
    conversation_examples: str = ""
    room_name: str | None = None
    identity: str | None = None


@app.get("/", include_in_schema=False)
async def home():
    index_file = FRONTEND_DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return FileResponse(TEMPLATES_DIR / "conversation_setup.html")


@app.post("/api/conversation/start")
async def start_conversation(payload: ConversationStartRequest):
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    server_url = os.getenv("LIVEKIT_URL")

    if not all([api_key, api_secret, server_url]):
        raise HTTPException(
            status_code=500,
            detail="LiveKit API credentials are not set in environment variables."
        )

    room_name = payload.room_name or f"english-tutor-{uuid4().hex[:8]}"
    identity = payload.identity or f"user-{uuid4().hex[:8]}"

    token = api.AccessToken(api_key, api_secret).with_identity(identity)
    token.with_grants(api.VideoGrants(room_join=True, room=room_name))
    token.with_metadata(payload.model_dump_json())
    jwt_token = token.to_jwt()

    return {
        "token": jwt_token,
        "livekit_url": server_url,
        "room_name": room_name,
        "identity": identity,
    }


@app.get("/{full_path:path}", include_in_schema=False)
async def frontend_routes(full_path: str):
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API route not found")

    requested_file = FRONTEND_DIST_DIR / full_path
    if requested_file.exists() and requested_file.is_file():
        return FileResponse(requested_file)

    index_file = FRONTEND_DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)

    raise HTTPException(status_code=404, detail="Frontend build not found")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
