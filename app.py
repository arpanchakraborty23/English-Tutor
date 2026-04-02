from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

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
    print("Received conversation setup:")
    print(f"Language: {payload.language}")
    print(f"Reason: {payload.reason}")
    print(f"Reason Type: {payload.reason_type}")
    print(f"Level: {payload.level}")
    print(f"Conversation Examples: {payload.conversation_examples}")
    return {
        "ok": True,
        "message": "Conversation setup received.",
        "data": payload.model_dump(),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
