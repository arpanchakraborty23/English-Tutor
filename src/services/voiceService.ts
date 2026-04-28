import { api } from "./api";

export interface LiveKitTokenResponse {
  token: string;
  livekit_url: string;
  room_name: string;
  identity: string;
}

export interface ConversationStartRequest {
  language: string;
  native_language: string;
  level: string;
  purpose: string;
  topic?: string;
  difficulty?: string;
  correction_style?: string;
  speaking_pace?: string;
  mood?: string;
  session_duration?: number;
}

export interface ConversationSession {
  id: string;
  room_name: string;
  status: "active" | "completed" | "cancelled";
  started_at: string;
  ended_at?: string;
  duration_seconds?: number;
  transcript?: TranscriptEntry[];
  feedback?: SessionFeedback;
}

export interface TranscriptEntry {
  id: string;
  speaker: "user" | "assistant";
  text: string;
  timestamp: string;
  corrections?: Correction[];
}

export interface Correction {
  type: "grammar" | "pronunciation" | "vocabulary";
  original: string;
  corrected: string;
  explanation: string;
}

export interface SessionFeedback {
  overall_score: number;
  grammar_score: number;
  pronunciation_score: number;
  vocabulary_score: number;
  fluency_score: number;
  strengths: string[];
  areas_to_improve: string[];
  words_learned: string[];
}

export const voiceService = {
  async startConversation(data: ConversationStartRequest): Promise<LiveKitTokenResponse> {
    return api.post<LiveKitTokenResponse>("/api/conversation/start", data);
  },

  async getToken(roomName: string): Promise<LiveKitTokenResponse> {
    return api.get<LiveKitTokenResponse>(`/api/token?room=${roomName}`);
  },

  async getSession(sessionId: string): Promise<ConversationSession> {
    return api.get<ConversationSession>(`/api/conversation/session/${sessionId}`);
  },

  async getRecentSessions(limit = 10): Promise<ConversationSession[]> {
    return api.get<ConversationSession[]>(`/api/conversation/sessions?limit=${limit}`);
  },

  async endSession(sessionId: string): Promise<ConversationSession> {
    return api.post<ConversationSession>(`/api/conversation/session/${sessionId}/end`);
  },
};
