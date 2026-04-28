import { api } from "./api";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  new_password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/login", credentials);
    api.setToken(response.token);
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    api.setToken(response.token);
    return response;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/api/auth/logout");
    } finally {
      api.setToken(null);
    }
  },

  async getCurrentUser(): Promise<User> {
    return api.get<User>("/api/auth/me");
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/refresh");
    api.setToken(response.token);
    return response;
  },

  async requestPasswordReset(data: PasswordResetRequest): Promise<{ message: string }> {
    return api.post("/api/auth/forgot-password", data);
  },

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<{ message: string }> {
    return api.post("/api/auth/reset-password", data);
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return api.patch<User>("/api/auth/profile", data);
  },

  async changePassword(data: { current_password: string; new_password: string }): Promise<{ message: string }> {
    return api.post("/api/auth/change-password", data);
  },

  isAuthenticated(): boolean {
    return !!api.getToken();
  },
};
