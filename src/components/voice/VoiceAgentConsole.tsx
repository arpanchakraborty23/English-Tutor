import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BarVisualizer,
  Chat,
  DisconnectButton,
  RoomAudioRenderer,
  SessionProvider,
  StartAudio,
  TrackToggle,
  VideoTrack,
  useSession,
  useLocalParticipant,
  useVoiceAssistant,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { TokenSource } from "livekit-client";
import { Track } from "livekit-client";
import {
  ArrowRight,
  LoaderCircle,
  MessageSquare,
  MessageSquareText,
  Mic,
  MonitorUp,
  PhoneOff,
  Video,
} from "lucide-react";

const DEFAULT_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000"}/api/conversation/start`;

type StatusTone = "success" | "error" | "";

type StatusState = {
  message: string;
  tone: StatusTone;
};

type ConnectionInfo = {
  token: string;
  livekitUrl: string;
  roomName: string;
  identity: string;
};

type PracticeSessionState = {
  purpose?: string | null;
  topic?: string;
  level?: string;
  targetLanguage?: string;
  nativeLanguage?: string;
  duration?: string;
  focusedSkills?: string[];
  scenario?: string;
  difficulty?: string;
  correctionStyle?: string;
  speakingPace?: string;
  mood?: string;
};

type LocationState = {
  practiceSession?: PracticeSessionState;
};

const purposeLabels: Record<string, string> = {
  business: "Business Meeting",
  casual: "Casual Chat",
  travel: "Travel & Leisure",
  exam: "Exam Prep",
  interview: "Job Interview",
  dining: "Dining & Social",
  medical: "Medical / Emergency",
  custom: "Custom",
  other: "Other",
};

function normalizeSessionState(session?: PracticeSessionState) {
  return {
    purpose: session?.purpose ?? "general",
    topic: session?.scenario ?? session?.topic?.trim() ?? "",
    level: session?.difficulty ?? session?.level ?? "intermediate",
    targetLanguage: session?.targetLanguage ?? "Japanese",
    nativeLanguage: session?.nativeLanguage ?? "English",
    duration: session?.duration ?? "15",
    focusedSkills: session?.focusedSkills ?? [],
    correctionStyle: session?.correctionStyle ?? "gentle",
    speakingPace: session?.speakingPace ?? "normal",
    mood: session?.mood ?? "focused",
  };
}

function WelcomeView({
  sessionLabel,
  topic,
  isStarting,
  status,
  onStart,
}: {
  sessionLabel: string;
  topic: string;
  isStarting: boolean;
  status: StatusState;
  onStart: () => void;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.2))]" />

      <div className="relative flex h-full w-full items-center justify-center p-4 md:p-8">
        <section className="relative flex h-full w-full max-w-[1280px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#070707] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_90px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/[0.03]" />

          <header className="relative z-10 flex items-center justify-between px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65 md:px-8">
            <div className="flex items-center gap-3">
              <div className="grid h-6 w-6 grid-cols-2 grid-rows-2 gap-[3px]">
                <span className="rounded-sm bg-white" />
                <span className="rounded-sm bg-cyan-400" />
                <span className="rounded-sm bg-cyan-400" />
                <span className="rounded-sm bg-white/10" />
              </div>
              <span className="hidden md:inline">{sessionLabel}</span>
            </div>
            <span>Built with LiveKit Agents</span>
          </header>

          <div className="relative flex flex-1 items-center justify-center px-6 py-10">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-6 h-16 w-16 text-white"
              >
                <path
                  d="M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787C14.6839 22.4413 15 23.2044 15 24ZM22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868C19.3161 6.44129 19 7.20435 19 8V56C19 56.7957 19.3161 57.5587 19.8787 58.1213C20.4413 58.6839 21.2044 59 22 59C22.7956 59 23.5587 58.6839 24.1213 58.1213C24.6839 57.5587 25 56.7957 25 56V8C25 7.20435 24.6839 6.44129 24.1213 5.87868C23.5587 5.31607 22.7956 5 22 5ZM32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787C29.3161 14.4413 29 15.2044 29 16V48C29 48.7957 29.3161 49.5587 29.8787 50.1213C30.4413 50.6839 31.2044 51 32 51C32.7956 51 33.5587 50.6839 34.1213 50.1213C34.6839 49.5587 35 48.7957 35 48V16C35 15.2044 34.6839 14.4413 34.1213 13.8787C33.5587 13.3161 32.7956 13 32 13ZM42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787C39.3161 22.4413 39 23.2044 39 24V40C39 40.7957 39.3161 41.5587 39.8787 42.1213C40.4413 42.6839 41.2043 43 42 43C42.7957 43 43.5587 42.6839 44.1213 42.1213C44.6839 41.5587 45 40.7957 45 40V24C45 23.2044 44.6839 22.4413 44.1213 21.8787C43.5587 21.3161 42.7957 21 42 21ZM52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787C49.3161 18.4413 49 19.2044 49 20V44C49 44.7957 49.3161 45.5587 49.8787 46.1213C50.4413 46.6839 51.2043 47 52 47C52.7957 47 53.5587 46.6839 54.1213 46.1213C54.6839 45.5587 55 44.7957 55 44V20C55 19.2044 54.6839 18.4413 54.1213 17.8787C53.5587 17.3161 52.7957 17 52 17Z"
                  fill="currentColor"
                />
              </svg>

              <p className="max-w-prose pt-1 text-base font-medium leading-6 text-white">
                Chat live with your voice AI agent
              </p>

              {topic ? (
                <p className="mt-4 max-w-prose text-sm leading-6 text-white/55">
                  Scenario: {topic}
                </p>
              ) : null}

              {status.message ? (
                <p
                  className={`mt-4 max-w-prose text-sm leading-6 ${
                    status.tone === "error" ? "text-red-300" : "text-white/55"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}

              <button
                type="button"
                onClick={onStart}
                disabled={isStarting}
                className="mt-6 inline-flex w-64 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isStarting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  <>
                    Start Call
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SessionStage({ sessionLabel }: { sessionLabel: string }) {
  const { state, audioTrack, videoTrack } = useVoiceAssistant();
  const { cameraTrack } = useLocalParticipant();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const statusLabel =
    state === "listening"
      ? "Listening"
      : state === "speaking"
        ? "Speaking"
        : state === "thinking"
          ? "Thinking"
          : "Connecting";

  const localCameraTrack =
    cameraTrack && !cameraTrack.publication.isMuted ? cameraTrack : undefined;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.2))]" />

      <div className="relative flex h-full w-full items-center justify-center p-4 md:p-8">
        <section className="relative flex h-full w-full max-w-[1280px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#070707] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_90px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/[0.03]" />

          <header className="relative z-10 flex items-center justify-between px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65 md:px-8">
            <div className="flex items-center gap-3">
              <div className="grid h-6 w-6 grid-cols-2 grid-rows-2 gap-[3px]">
                <span className="rounded-sm bg-white" />
                <span className="rounded-sm bg-cyan-400" />
                <span className="rounded-sm bg-cyan-400" />
                <span className="rounded-sm bg-white/10" />
              </div>
              <span className="hidden md:inline">{sessionLabel}</span>
            </div>
            <span>Built with LiveKit Agents</span>
          </header>

          <div className="relative flex-1 px-4 pb-4 md:px-6 md:pb-6">
            <div className="relative h-full rounded-[20px] border border-white/8 bg-black">
              <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_22%)]" />

              {videoTrack ? (
                <VideoTrack
                  trackRef={videoTrack}
                  className="absolute inset-0 h-full w-full rounded-[20px] object-cover opacity-70"
                />
              ) : null}

              <div className="absolute inset-0 rounded-[20px] bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.35))]" />

              <div className="relative flex h-full flex-col">
                <div className="flex-1" />

                <div className="absolute inset-x-0 top-[22%] flex justify-center px-6">
                  <div className="flex flex-col items-center gap-5">
                    <div className="rounded-[36px] bg-white/[0.02] px-8 py-6 shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                      {audioTrack ? (
                        <BarVisualizer
                          state={state}
                          barCount={5}
                          options={{ minHeight: 28 }}
                          className="h-24 w-56 text-white md:h-32 md:w-72"
                        />
                      ) : (
                        <LoaderCircle className="h-14 w-14 animate-spin text-white/85" />
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
                        {statusLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-28 right-6 z-10 md:right-8">
                  <div className="h-[78px] w-[118px] overflow-hidden rounded-[14px] border border-white/12 bg-[#121212] shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                    {localCameraTrack ? (
                      <VideoTrack
                        trackRef={localCameraTrack}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/50">
                        <Mic className="h-4 w-4" />
                        <span className="text-[9px] font-medium uppercase tracking-[0.24em]">
                          Camera Off
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-5">
                  <div className="rounded-[18px] border border-white/10 bg-[#0b0b0b]/95 px-3 py-2 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <TrackToggle
                          source={Track.Source.Microphone}
                          showIcon={false}
                          className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/75 transition hover:bg-white/[0.09]"
                        >
                          <Mic className="h-4 w-4" />
                        </TrackToggle>

                        <TrackToggle
                          source={Track.Source.Camera}
                          showIcon={false}
                          className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/75 transition hover:bg-white/[0.09]"
                        >
                          <Video className="h-4 w-4" />
                        </TrackToggle>

                        <button
                          type="button"
                          onClick={() => setIsChatOpen((open) => !open)}
                          className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/75 transition hover:bg-white/[0.09]"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          className="hidden h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/40 md:flex"
                        >
                          <MonitorUp className="h-4 w-4" />
                        </button>
                      </div>

                      <DisconnectButton className="flex h-11 items-center gap-2 rounded-full border border-red-500/20 bg-[#2b120f] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff8d79] transition hover:bg-[#391713]">
                        <PhoneOff className="h-4 w-4" />
                        End Call
                      </DisconnectButton>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute left-6 top-20 z-10 w-[320px] overflow-hidden rounded-[16px] border border-white/10 bg-black/55 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition ${
                  isChatOpen ? "opacity-100" : "pointer-events-none opacity-0 xl:pointer-events-auto xl:opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-medium text-white/65">
                  <MessageSquareText className="h-4 w-4" />
                  Live Transcript
                </div>
                <div className="h-[320px] p-4 [&_.lk-chat]:h-full [&_.lk-chat-header]:hidden [&_.lk-chat-messages]:h-full [&_.lk-message]:border-0 [&_.lk-message]:bg-transparent [&_.lk-message]:px-0 [&_.lk-message]:text-white/78 [&_.lk-chat-form]:mt-3 [&_.lk-chat-form]:flex [&_.lk-chat-form]:gap-2 [&_.lk-chat-form-input]:h-10 [&_.lk-chat-form-input]:flex-1 [&_.lk-chat-form-input]:rounded-full [&_.lk-chat-form-input]:border [&_.lk-chat-form-input]:border-white/10 [&_.lk-chat-form-input]:bg-white/[0.04] [&_.lk-chat-form-input]:px-4 [&_.lk-chat-form-input]:text-white [&_.lk-chat-form-input]:outline-none [&_.lk-chat-form-button]:rounded-full [&_.lk-chat-form-button]:border [&_.lk-chat-form-button]:border-white/10 [&_.lk-chat-form-button]:bg-white/[0.06] [&_.lk-chat-form-button]:px-4 [&_.lk-chat-form-button]:text-white/85">
                  <Chat className="h-full w-full text-sm text-white/75" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function VoiceAgentConsole() {
  const location = useLocation();
  const endpointUrl = DEFAULT_ENDPOINT;
  const [status, setStatus] = useState<StatusState>({ message: "", tone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const routeState = (location.state as LocationState | null)?.practiceSession;
  const practiceSession = useMemo(() => normalizeSessionState(routeState), [routeState]);
  const purposeLabel = purposeLabels[practiceSession.purpose] ?? "General Conversation";
  const sessionLabel = `${purposeLabel} ${practiceSession.level}`.trim();

  const participantMetadata = useMemo(
    () =>
      JSON.stringify({
        user_name: "Student",
        language: practiceSession.targetLanguage.toLowerCase(),
        native_language: practiceSession.nativeLanguage.toLowerCase(),
        reason: practiceSession.purpose,
        reason_type: practiceSession.purpose,
        level: practiceSession.level,
        conversation_examples: practiceSession.topic,
        focused_skills: practiceSession.focusedSkills,
        correction_style: practiceSession.correctionStyle,
        speaking_pace: practiceSession.speakingPace,
        mood: practiceSession.mood,
        session_duration: parseInt(practiceSession.duration, 10),
      }),
    [practiceSession],
  );

  const participantAttributes = useMemo(
    () => ({
      language: practiceSession.targetLanguage.toLowerCase(),
      level: practiceSession.level,
      reason: practiceSession.purpose,
      reason_type: practiceSession.purpose,
      native_language: practiceSession.nativeLanguage.toLowerCase(),
    }),
    [practiceSession],
  );

  const tokenSource = useMemo(
    () =>
      TokenSource.endpoint(endpointUrl.replace("/api/conversation/start", "/api/token")),
    [endpointUrl],
  );

  const session = useSession(tokenSource, {
    participantName: "Student",
    participantMetadata,
    participantAttributes,
  });

  const handleStartSession = async () => {
    if (isSubmitting) {
      return;
    }

    if (!endpointUrl.trim()) {
      setStatus({ message: "Practice session endpoint is missing.", tone: "error" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "", tone: "" });

    try {
      await session.start();
      setStatus({
        message: "Practice session started. LiveKit room is connecting now.",
        tone: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Session start failed.";
      setStatus({ message, tone: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (session.connectionState === "disconnected" && status.tone === "success") {
      setStatus({
        message: "Session ended. You can start another round whenever ready.",
        tone: "success",
      });
    }
  }, [session.connectionState]);

  if (session.isConnected) {
    return (
      <SessionProvider session={session}>
        <div className="h-full w-full" data-lk-theme="default">
          <SessionStage sessionLabel={sessionLabel} />
          <RoomAudioRenderer />
          <StartAudio
            label="Start Audio"
            className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-white/10 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black"
          />
        </div>
      </SessionProvider>
    );
  }

  return (
    <WelcomeView
      sessionLabel={sessionLabel}
      topic={practiceSession.topic}
      isStarting={isSubmitting}
      status={status}
      onStart={handleStartSession}
    />
  );
}
