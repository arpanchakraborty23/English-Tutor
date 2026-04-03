import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { VoiceAgentConsole } from "@/components/voice/VoiceAgentConsole";
import { Button } from "@/components/ui/button";

const VoiceAgent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card/10">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Voice Console</p>
            <h1 className="font-heading text-2xl">LiveKit Agent Session</h1>
          </div>

          <Button asChild variant="outline" className="gap-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-10">
        <VoiceAgentConsole />
      </main>
    </div>
  );
};

export default VoiceAgent;
