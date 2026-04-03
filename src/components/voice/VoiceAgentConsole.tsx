import { useMemo, useRef, useState } from "react";
import { Room, RoomEvent, Track } from "livekit-client";

const DEFAULT_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000"}/api/conversation/start`;

type ReasonType = "business" | "communication" | "general" | "other" | "";
type LevelType = "beginner" | "intermediate" | "advanced" | "";

type StatusState = {
  message: string;
  tone: "success" | "error" | "";
};

type ConnectionInfo = {
  token: string;
  livekitUrl: string;
  roomName: string;
  identity: string;
};

const steps = ["1. User Info", "2. Language", "3. Reason", "4. Level", "5. Examples"];

export function VoiceAgentConsole() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [language, setLanguage] = useState("");
  const [reason, setReason] = useState<ReasonType>("");
  const [otherReason, setOtherReason] = useState("");
  const [level, setLevel] = useState<LevelType>("");
  const [conversationExamples, setConversationExamples] = useState("");
  const [endpointUrl, setEndpointUrl] = useState(DEFAULT_ENDPOINT);
  const [status, setStatus] = useState<StatusState>({ message: "", tone: "" });
  const [responseData, setResponseData] = useState<unknown>(null);
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);
  const [voiceStatus, setVoiceStatus] = useState("Submit setup first to enable voice connection.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoiceConnecting, setIsVoiceConnecting] = useState(false);
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);

  const roomRef = useRef<Room | null>(null);
  const audioElementsRef = useRef<Map<string, HTMLMediaElement>>(new Map());

  const summary = useMemo(() => {
    const finalReason = reason === "other" ? otherReason.trim() : reason;

    return {
      language: language || "-",
      reason: finalReason || "-",
      level: level || "-",
      examples: conversationExamples.trim() || "-",
    };
  }, [conversationExamples, language, level, otherReason, reason]);

  const clearAttachedAudio = () => {
    audioElementsRef.current.forEach((element) => {
      element.pause();
      element.remove();
    });
    audioElementsRef.current.clear();
  };

  const validateStep = (step: number) => {
    if (step === 0) {
      if (!userName.trim()) {
        setStatus({ message: "Please enter your name.", tone: "error" });
        return false;
      }

      if (age && (!Number.isInteger(Number(age)) || Number(age) <= 0)) {
        setStatus({ message: "Please enter a valid age.", tone: "error" });
        return false;
      }
    }

    if (step === 1 && !language) {
      setStatus({ message: "Please choose a language.", tone: "error" });
      return false;
    }

    if (step === 2) {
      if (!reason) {
        setStatus({ message: "Please select one reason.", tone: "error" });
        return false;
      }

      if (reason === "other" && !otherReason.trim()) {
        setStatus({ message: "Please write your custom reason.", tone: "error" });
        return false;
      }
    }

    if (step === 3 && !level) {
      setStatus({ message: "Please select your level.", tone: "error" });
      return false;
    }

    setStatus({ message: "", tone: "" });
    return true;
  };

  const buildPayload = () => ({
    user_name: userName.trim(),
    age: age ? Number(age) : null,
    native_language: nativeLanguage.trim(),
    language,
    reason: reason === "other" ? otherReason.trim() : reason,
    reason_type: reason,
    level,
    conversation_examples: conversationExamples.trim(),
  });

  const extractConnectionInfo = (data: unknown): ConnectionInfo | null => {
    if (!data || typeof data !== "object") {
      return null;
    }

    const source = data as Record<string, unknown>;
    const nested = typeof source.data === "object" && source.data ? (source.data as Record<string, unknown>) : null;

    const token = (source.token as string | undefined) ?? (nested?.token as string | undefined);
    const livekitUrl =
      (source.livekit_url as string | undefined) ??
      (source.livekitUrl as string | undefined) ??
      (nested?.livekit_url as string | undefined) ??
      (nested?.livekitUrl as string | undefined);
    const roomName =
      (source.room_name as string | undefined) ??
      (source.roomName as string | undefined) ??
      (nested?.room_name as string | undefined) ??
      (nested?.roomName as string | undefined) ??
      "";
    const identity = (source.identity as string | undefined) ?? (nested?.identity as string | undefined) ?? "";

    if (!token || !livekitUrl) {
      return null;
    }

    return { token, livekitUrl, roomName, identity };
  };

  const disconnectVoice = async () => {
    const room = roomRef.current;
    if (room) {
      room.removeAllListeners();
      await room.disconnect();
      roomRef.current = null;
    }

    clearAttachedAudio();
    setIsVoiceConnected(false);
    setIsVoiceConnecting(false);
    setMicEnabled(true);
    setVoiceStatus("Disconnected from voice room.");
  };

  const connectVoice = async () => {
    if (!connectionInfo) {
      setVoiceStatus("No token/livekit URL. Submit setup first.");
      return;
    }

    setIsVoiceConnecting(true);
    setVoiceStatus("Connecting to LiveKit room...");

    const room = new Room();

    room.on(RoomEvent.TrackSubscribed, (track, publication) => {
      if (track.kind !== Track.Kind.Audio) {
        return;
      }

      const element = track.attach() as HTMLMediaElement;
      element.autoplay = true;
      element.controls = false;
      element.className = "hidden";
      document.body.appendChild(element);
      audioElementsRef.current.set(publication.trackSid, element);
    });

    room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
      const element = audioElementsRef.current.get(publication.trackSid);
      if (!element) {
        return;
      }

      element.pause();
      element.remove();
      audioElementsRef.current.delete(publication.trackSid);
    });

    room.on(RoomEvent.Disconnected, () => {
      roomRef.current = null;
      clearAttachedAudio();
      setIsVoiceConnected(false);
      setIsVoiceConnecting(false);
      setMicEnabled(true);
      setVoiceStatus("Disconnected from voice room.");
    });

    try {
      await room.connect(connectionInfo.livekitUrl, connectionInfo.token);
      await room.localParticipant.setMicrophoneEnabled(true);
      roomRef.current = room;
      setMicEnabled(true);
      setIsVoiceConnected(true);
      setVoiceStatus("Connected. Mic is ON. Start speaking.");
    } catch (error) {
      await room.disconnect();
      const message = error instanceof Error ? error.message : "Unknown LiveKit connection error.";
      setVoiceStatus(`Voice connect failed: ${message}`);
      setIsVoiceConnected(false);
    } finally {
      setIsVoiceConnecting(false);
    }
  };

  const toggleMute = async () => {
    const room = roomRef.current;
    if (!room) {
      return;
    }

    const nextValue = !micEnabled;
    await room.localParticipant.setMicrophoneEnabled(nextValue);
    setMicEnabled(nextValue);
    setVoiceStatus(nextValue ? "Connected. Mic is ON." : "Connected. Mic is OFF.");
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setCurrentStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setStatus({ message: "", tone: "" });
    setCurrentStep((value) => Math.max(value - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep(0) || !validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    if (!endpointUrl.trim()) {
      setStatus({ message: "Please provide endpoint URL.", tone: "error" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "", tone: "" });
    setResponseData(null);
    setConnectionInfo(null);
    await disconnectVoice();

    try {
      const response = await fetch(endpointUrl.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      });

      const responseText = await response.text();
      let parsedData: unknown = {};

      try {
        parsedData = responseText ? JSON.parse(responseText) : {};
      } catch {
        parsedData = { raw_response: responseText };
      }

      if (!response.ok) {
        throw new Error(responseText || `Request failed with status ${response.status}`);
      }

      const info = extractConnectionInfo(parsedData);
      setResponseData(parsedData);
      setConnectionInfo(info);
      setStatus({
        message: "Conversation setup submitted successfully. Token/response shown below.",
        tone: "success",
      });
      setVoiceStatus(
        info
          ? `Ready to connect. Room: ${info.roomName || "unknown"} | Identity: ${info.identity || "unknown"}`
          : "Token found, but LiveKit URL is missing in response.",
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submit failed.";
      setStatus({ message: `Submit failed: ${message}`, tone: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#dbe3ef] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <div className="border-b border-[#dbe3ef] px-6 pb-4 pt-5">
        <h1 className="mb-1 text-[1.35rem] font-bold text-[#1f2937]">Start English Tutor Conversation</h1>
        <p className="text-[0.95rem] text-[#6b7280]">
          Choose your preferences before starting the conversation.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 px-6 pt-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`rounded-full border px-3 py-2 text-center text-[0.84rem] ${
              index === currentStep
                ? "border-[#0f766e] bg-[#effcf9] font-semibold text-[#0f766e]"
                : "border-[#dbe3ef] bg-[#fafcff] text-[#6b7280]"
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="px-6 py-6">
          {currentStep === 0 && (
            <section>
              <h2 className="mb-4 text-[1.08rem] font-semibold text-[#1f2937]">Tell Us About Yourself</h2>
              <div className="mb-3">
                <label className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]" htmlFor="userName">
                  Your Name
                </label>
                <input
                  id="userName"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  placeholder="Example: Arpan"
                  className="w-full rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="Example: 30"
                  className="w-full rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]"
                  htmlFor="nativeLanguage"
                >
                  Native Language
                </label>
                <input
                  id="nativeLanguage"
                  value={nativeLanguage}
                  onChange={(event) => setNativeLanguage(event.target.value)}
                  placeholder="Example: Hindi"
                  className="w-full rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                />
              </div>
            </section>
          )}

          {currentStep === 1 && (
            <section>
              <h2 className="mb-4 text-[1.08rem] font-semibold text-[#1f2937]">Select Preferred Language</h2>
              <div>
                <label className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]" htmlFor="language">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section>
              <h2 className="mb-4 text-[1.08rem] font-semibold text-[#1f2937]">Why Do You Want to Practice?</h2>
              <div className="grid gap-2.5">
                {[
                  ["business", "Business"],
                  ["communication", "Communication"],
                  ["general", "General"],
                  ["other", "Other"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-[11px] text-[#1f2937]"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={value}
                      checked={reason === value}
                      onChange={() => setReason(value as ReasonType)}
                    />
                    {label}
                  </label>
                ))}
              </div>

              {reason === "other" && (
                <div className="mt-3">
                  <label className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]" htmlFor="otherReason">
                    Write your reason
                  </label>
                  <input
                    id="otherReason"
                    value={otherReason}
                    onChange={(event) => setOtherReason(event.target.value)}
                    placeholder="Example: Interview preparation"
                    className="w-full rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                  />
                </div>
              )}
            </section>
          )}

          {currentStep === 3 && (
            <section>
              <h2 className="mb-4 text-[1.08rem] font-semibold text-[#1f2937]">Select Your Level</h2>
              <div className="grid gap-2.5">
                {[
                  ["beginner", "Beginner"],
                  ["intermediate", "Intermediate"],
                  ["advanced", "Advanced"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-[11px] text-[#1f2937]"
                  >
                    <input
                      type="radio"
                      name="level"
                      value={value}
                      checked={level === value}
                      onChange={() => setLevel(value as LevelType)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </section>
          )}

          {currentStep === 4 && (
            <section>
              <h2 className="mb-4 text-[1.08rem] font-semibold text-[#1f2937]">Conversation Examples</h2>
              <div className="mb-3">
                <label
                  className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]"
                  htmlFor="conversationExamples"
                >
                  Give example topics or lines you want to practice
                </label>
                <textarea
                  id="conversationExamples"
                  value={conversationExamples}
                  onChange={(event) => setConversationExamples(event.target.value)}
                  placeholder="Example: Meeting introduction, negotiating deadlines, introducing myself"
                  className="min-h-[100px] w-full resize-y rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1.5 block text-[0.92rem] font-semibold text-[#374151]" htmlFor="endpointUrl">
                  Submit Endpoint
                </label>
                <input
                  id="endpointUrl"
                  value={endpointUrl}
                  onChange={(event) => setEndpointUrl(event.target.value)}
                  className="w-full rounded-[10px] border border-[#dbe3ef] bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-[#5dc8bf] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)]"
                />
              </div>

              <div className="rounded-[10px] border border-dashed border-[#d1d5db] bg-[#f9fafb] p-3 text-[0.93rem] leading-7 text-[#374151]">
                <strong>Name:</strong> {userName.trim() || "-"}
                <br />
                <strong>Age:</strong> {age || "-"}
                <br />
                <strong>Native Language:</strong> {nativeLanguage.trim() || "-"}
                <br />
                <strong>Language:</strong> {summary.language}
                <br />
                <strong>Reason:</strong> {summary.reason}
                <br />
                <strong>Level:</strong> {summary.level}
                <br />
                <strong>Examples:</strong> {summary.examples}
              </div>
            </section>
          )}
        </div>

        <div className="flex flex-wrap justify-between gap-2 px-6 pb-5">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-[10px] bg-[#f2f4f8] px-4 py-2.5 text-[0.94rem] font-semibold text-[#374151] disabled:cursor-not-allowed disabled:opacity-55"
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto rounded-[10px] bg-[#0f766e] px-4 py-2.5 text-[0.94rem] font-semibold text-white hover:bg-[#115e59]"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto rounded-[10px] bg-[#0f766e] px-4 py-2.5 text-[0.94rem] font-semibold text-white hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Starting..." : "Start Conversation"}
            </button>
          )}
        </div>

        {status.message && (
          <div
            className={`mx-6 mb-4 rounded-[10px] border px-3 py-2.5 text-[0.9rem] ${
              status.tone === "success"
                ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#065f46]"
                : "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]"
            }`}
          >
            {status.message}
          </div>
        )}

        {responseData && (
          <div className="mx-6 mb-4 rounded-[10px] border border-[#dbe3ef] bg-[#f8fbff] p-3">
            <div className="text-sm text-[#1f2937]">
              <strong>Token:</strong>{" "}
              {typeof responseData === "object" && responseData && "token" in responseData
                ? String((responseData as { token?: string }).token ?? "Not found in response")
                : "Not found in response"}
            </div>
            <pre className="mt-2 whitespace-pre-wrap break-words text-[0.85rem] text-[#1f2937]">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        )}

        <div className="mx-6 mb-6 rounded-[10px] border border-[#dbe3ef] bg-[#f8fffc] p-3">
          <strong className="text-[#1f2937]">Voice Agent</strong>
          <div className="my-2 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={connectVoice}
              disabled={!connectionInfo || isVoiceConnected || isVoiceConnecting}
              className="rounded-[10px] bg-[#0f766e] px-4 py-2.5 text-[0.94rem] font-semibold text-white hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVoiceConnecting ? "Connecting..." : "Connect Voice"}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              disabled={!isVoiceConnected}
              className="rounded-[10px] bg-[#f2f4f8] px-4 py-2.5 text-[0.94rem] font-semibold text-[#374151] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {micEnabled ? "Mute Mic" : "Unmute Mic"}
            </button>
            <button
              type="button"
              onClick={() => void disconnectVoice()}
              disabled={!isVoiceConnected}
              className="rounded-[10px] bg-[#f2f4f8] px-4 py-2.5 text-[0.94rem] font-semibold text-[#374151] disabled:cursor-not-allowed disabled:opacity-55"
            >
              Disconnect
            </button>
          </div>
          <div className="text-[0.9rem] leading-6 text-[#374151]">{voiceStatus}</div>
        </div>
      </form>
    </div>
  );
}
