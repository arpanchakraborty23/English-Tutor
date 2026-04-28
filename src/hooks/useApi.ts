import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, voiceService, progressService } from "@/services";
import type { LoginCredentials, RegisterData, ConversationStartRequest } from "@/services";

const STALE_TIME = 5 * 60 * 1000;

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: STALE_TIME,
    retry: false,
    enabled: authService.isAuthenticated(),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => progressService.getDashboardData(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => progressService.getStats(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useWeeklyPractice() {
  return useQuery({
    queryKey: ["weeklyPractice"],
    queryFn: () => progressService.getWeeklyPractice(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useSkillProgress() {
  return useQuery({
    queryKey: ["skillProgress"],
    queryFn: () => progressService.getSkillProgress(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useFluencyTrend() {
  return useQuery({
    queryKey: ["fluencyTrend"],
    queryFn: () => progressService.getFluencyTrend(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useRecentSessions(limit = 10) {
  return useQuery({
    queryKey: ["recentSessions", limit],
    queryFn: () => progressService.getRecentSessions(limit),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: () => progressService.getAchievements(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}

export function useLearningGoals() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["learningGoals"],
    queryFn: () => progressService.getLearningGoals(),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });

  const createGoal = useMutation({
    mutationFn: progressService.createLearningGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learningGoals"] });
    },
  });

  const updateGoal = useMutation({
    mutationFn: ({ id, progress }: { id: string; progress: number }) =>
      progressService.updateLearningGoal(id, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learningGoals"] });
    },
  });

  return {
    ...query,
    createGoal,
    updateGoal,
  };
}

export function useStartConversation() {
  return useMutation({
    mutationFn: (data: ConversationStartRequest) => voiceService.startConversation(data),
  });
}

export function useConversationSession(sessionId: string | null) {
  return useQuery({
    queryKey: ["conversationSession", sessionId],
    queryFn: () => voiceService.getSession(sessionId!),
    enabled: !!sessionId && authService.isAuthenticated(),
    staleTime: STALE_TIME,
  });
}

export function useConversationSessions(limit = 10) {
  return useQuery({
    queryKey: ["conversationSessions", limit],
    queryFn: () => voiceService.getRecentSessions(limit),
    staleTime: STALE_TIME,
    enabled: authService.isAuthenticated(),
  });
}
