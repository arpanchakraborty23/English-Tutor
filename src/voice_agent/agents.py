from livekit.agents import Agent, ChatContext


class Assistant:
    """A factory for creating English tutor agents based on the specified language."""
    @staticmethod
    def _tutor(language,instructions, initial_ctx) -> Agent:
        if language.lower() == "english":
            return EnglishTutor(
                instructions=instructions,
                initial_ctx= initial_ctx
                )



class EnglishTutor(Agent):
    def __init__(self, instructions: str ,initial_ctx: ChatContext = None ) -> None:
        super().__init__(
            instructions=instructions,
            chat_ctx=initial_ctx
        )
        
