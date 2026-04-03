import json
import os
from datetime import timedelta
from pathlib import Path
from uuid import uuid4

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from livekit import api
from pydantic import BaseModel, Field

load_dotenv()

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


class TokenEndpointRequest(BaseModel):
    room_name: str | None = None
    participant_identity: str | None = None
    participant_name: str | None = None
    participant_metadata: str | None = None
    participant_attributes: dict[str, str] = Field(default_factory=dict)
    room_config: dict | None = None


class ConversationStartRequest(BaseModel):
    user_name: str = ""
    age: int | None = None
    native_language: str = ""
    language: str = "english"
    reason: str = "general"
    reason_type: str = "general"
    level: str = "intermediate"
    conversation_examples: str = ""
    room_name: str | None = None
    identity: str | None = None


def _require_livekit_env() -> tuple[str, str, str]:
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    server_url = os.getenv("LIVEKIT_URL")

    if not all([api_key, api_secret, server_url]):
        raise HTTPException(
            status_code=500,
            detail="LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and LIVEKIT_URL must be set.",
        )

    return api_key, api_secret, server_url


def _build_room_config(room_config_data: dict | None):
    if not room_config_data:
        return None
    return room_config_data


def _create_participant_token(payload: TokenEndpointRequest) -> dict[str, str]:
    api_key, api_secret, server_url = _require_livekit_env()

    room_name = payload.room_name or f"english-tutor-{uuid4().hex[:8]}"
    participant_identity = payload.participant_identity or f"user-{uuid4().hex[:8]}"
    participant_name = payload.participant_name or "Student"

    access_token = (
        api.AccessToken(api_key, api_secret)
        .with_identity(participant_identity)
        .with_name(participant_name)
        .with_ttl(timedelta(minutes=60))
        .with_grants(
            api.VideoGrants(
                room_join=True,
                room=room_name,
                can_publish=True,
                can_publish_data=True,
                can_subscribe=True,
            )
        )
    )

    if payload.participant_metadata:
        access_token = access_token.with_metadata(payload.participant_metadata)

    if payload.participant_attributes:
        access_token = access_token.with_attributes(payload.participant_attributes)

    room_config = _build_room_config(payload.room_config)

    participant_token = access_token.to_jwt()

    return {
        "server_url": server_url,
        "participant_token": participant_token,
        "room_name": room_name,
        "participant_identity": participant_identity,
        "participant_name": participant_name,
    }


@app.get("/", include_in_schema=False)
async def home():
    index_file = FRONTEND_DIST_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return FileResponse(TEMPLATES_DIR / "conversation_setup.html")


@app.post("/api/token", status_code=201)
async def create_token(payload: TokenEndpointRequest, response: Response):
    response.headers["Cache-Control"] = "no-store"
    return _create_participant_token(payload)


@app.post("/api/conversation/start")
async def start_conversation(payload: ConversationStartRequest):
    participant_context = {
        "user_name": payload.user_name,
        "age": payload.age,
        "native_language": payload.native_language,
        "language": payload.language,
        "reason": payload.reason,
        "reason_type": payload.reason_type,
        "level": payload.level,
        "conversation_examples": payload.conversation_examples,
    }

    token_payload = TokenEndpointRequest(
        room_name=payload.room_name,
        participant_identity=payload.identity,
        participant_name=payload.user_name or "Student",
        participant_metadata=json.dumps(participant_context),
        participant_attributes={
            "language": payload.language,
            "level": payload.level,
            "reason": payload.reason,
            "reason_type": payload.reason_type,
            "native_language": payload.native_language or "unknown",
        },
    )

    token_data = _create_participant_token(token_payload)

    return {
        "token": token_data["participant_token"],
        "livekit_url": token_data["server_url"],
        "room_name": token_data["room_name"],
        "identity": token_data["participant_identity"],
        "participant_name": token_data["participant_name"],
        "participant_metadata": token_payload.participant_metadata,
        "participant_attributes": token_payload.participant_attributes,
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
