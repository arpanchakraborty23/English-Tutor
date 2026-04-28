import { VoiceAgentConsole } from "@/components/voice/VoiceAgentConsole";

const VoiceAgent = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <main className="h-full w-full relative">
        <VoiceAgentConsole />
      </main>
    </div>
  );
};

export default VoiceAgent;
