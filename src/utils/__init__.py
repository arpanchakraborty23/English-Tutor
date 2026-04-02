import json
import logging

from typing import Any

logger = logging.getLogger(__name__)

def parse_json_metadata(raw_metadata: str | None) -> dict[str, Any]:
    if not raw_metadata or raw_metadata == "empty":
        return {}

    try:
        parsed = json.loads(raw_metadata)
        return parsed if isinstance(parsed, dict) else {"raw_metadata": parsed}
    except json.JSONDecodeError:
        logger.warning("Participant metadata is not valid JSON. Falling back to raw string.")
        return {"raw_metadata": raw_metadata}


def build_user_profile_text(participant_context: dict[str, Any]) -> str:
    user_name = participant_context.get("user_name") or participant_context.get("name") or "Unknown"
    age = participant_context.get("age") or "Unknown"
    native_language = participant_context.get("native_language") or "Unknown"
    level = participant_context.get("level") or participant_context.get("english_level") or "Unknown"
    practice_language = participant_context.get("language") or "english"
    reason = participant_context.get("reason") or "general practice"
    examples = participant_context.get("conversation_examples") or "not provided"

    return (
        f"name:{user_name},"
        f"age:{age},"
        f"native_language:{native_language},"
        f"english_level:{level},"
        f"practice_language:{practice_language},"
        f"practice_reason:{reason},"
        f"examples:{examples}"
    )
