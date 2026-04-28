import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Bot,
  Loader2,
  Volume2,
} from "lucide-react";

import type { TrackReference } from "@livekit/components-core";

interface TutorAvatarProps {
  isConnecting?: boolean;
  isConnected?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  isThinking?: boolean;
  videoTrack?: TrackReference | null;
  audioTrack?: TrackReference | null;
  avatarUrl?: string;
  className?: string;
}

export function TutorAvatar({
  isConnecting = false,
  isConnected = false,
  isListening = false,
  isSpeaking = false,
  isThinking = false,
  videoTrack,
  audioTrack,
  avatarUrl,
  className,
}: TutorAvatarProps) {
  const showAvatar = !videoTrack;
  const statusText = isConnecting
    ? "Connecting..."
    : isThinking
      ? "Thinking..."
      : isConnected
        ? "AI Tutor"
        : "Disconnected";

  const subStatusText = isListening
    ? "Listening..."
    : isSpeaking
      ? "Speaking..."
      : isConnected
        ? "Ready"
        : "";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full h-full bg-gradient-to-br from-[#F8FAFB] to-[#E5E9EE] rounded-2xl overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
      </div>

      {videoTrack ? (
        <div className="absolute inset-0" id="avatar-video-container">
          <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
            <p className="text-[#9CA3AF] text-sm">LiveKit Avatar Video</p>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center">
          <div
            className={cn(
              "relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-all duration-300",
              isConnecting && "animate-pulse",
              isListening && "ring-4 ring-[#10B981]/30 ring-offset-4 ring-offset-[#F8FAFB]",
              isSpeaking && "ring-4 ring-[#6366F1]/30 ring-offset-4 ring-offset-[#F8FAFB]",
              isThinking && "ring-4 ring-[#F59E0B]/30 ring-offset-4 ring-offset-[#F8FAFB]"
            )}
            style={{
              background: isConnected
                ? "linear-gradient(135deg, #10B981, #059669)"
                : "linear-gradient(135deg, #E5E9EE, #D1D5DB)",
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="AI Tutor"
                className="w-full h-full rounded-full object-cover"
              />
            ) : isConnecting || isThinking ? (
              <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-white animate-spin" />
            ) : (
              <Bot
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 transition-colors",
                  isConnected ? "text-white" : "text-[#9CA3AF]"
                )}
              />
            )}
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-center gap-2">
              {isSpeaking && (
                <span className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className="w-1 h-4 bg-[#10B981] rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              )}
              <p className="text-sm font-medium text-[#374151]">{statusText}</p>
            </div>
            {subStatusText && (
              <p className="text-xs text-[#9CA3AF] mt-1">{subStatusText}</p>
            )}
          </div>

          {isSpeaking && !videoTrack && (
            <AudioWaveform className="mt-4" />
          )}
        </div>
      )}

      {isConnected && !isSpeaking && isListening && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 shadow-md border border-[#E5E9EE]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-medium text-[#10B981]">Listening</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AudioWaveform({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end gap-1 h-8", className)}>
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-gradient-to-t from-[#10B981] to-[#059669] rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 24 + 8}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.5s",
          }}
        />
      ))}
    </div>
  );
}

interface SessionControlsProps {
  isMicOn: boolean;
  isVideoOn: boolean;
  onMicToggle: () => void;
  onVideoToggle: () => void;
  onEndSession: () => void;
  isConnected?: boolean;
  className?: string;
}

export function SessionControls({
  isMicOn,
  isVideoOn,
  onMicToggle,
  onVideoToggle,
  onEndSession,
  isConnected = false,
  className,
}: SessionControlsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3 md:gap-4", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={onMicToggle}
        disabled={!isConnected}
        className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all shadow-sm",
          isMicOn
            ? "border-[#10B981] bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#10B981]"
            : "border-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444]"
        )}
      >
        {isMicOn ? <Mic className="w-5 h-5 md:w-6 md:h-6" /> : <MicOff className="w-5 h-5 md:w-6 md:h-6" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onVideoToggle}
        disabled={!isConnected}
        className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all shadow-sm",
          isVideoOn
            ? "border-[#10B981] bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#10B981]"
            : "border-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444]"
        )}
      >
        {isVideoOn ? <Video className="w-5 h-5 md:w-6 md:h-6" /> : <VideoOff className="w-5 h-5 md:w-6 md:h-6" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onEndSession}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#EF4444] bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-sm"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 rotate-[135deg]" />
      </Button>
    </div>
  );
}

interface VoiceInputProps {
  onVoiceStart?: () => void;
  onVoiceStop?: () => void;
  isListening?: boolean;
  isConnected?: boolean;
  className?: string;
}

export function VoiceInput({
  onVoiceStart,
  onVoiceStop,
  isListening = false,
  isConnected = false,
  className,
}: VoiceInputProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="outline"
        size="icon"
        disabled={!isConnected}
        className={cn(
          "w-12 h-12 rounded-full border-2 transition-all shadow-sm",
          isListening
            ? "border-[#10B981] bg-[#D1FAE5] text-[#10B981] animate-pulse"
            : "border-[#E5E9EE] bg-white hover:bg-[#F3F4F6] text-[#6B7280]"
        )}
        onMouseDown={onVoiceStart}
        onMouseUp={onVoiceStop}
        onMouseLeave={onVoiceStop}
      >
        <Mic className="w-5 h-5" />
      </Button>
      <div className="flex-1">
        <p className="text-xs text-[#9CA3AF]">
          {isListening ? "Listening..." : "Press and hold to speak"}
        </p>
      </div>
    </div>
  );
}
