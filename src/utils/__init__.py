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