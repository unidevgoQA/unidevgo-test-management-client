export interface User {
  id: string;
  email: string;
  fullName: string;
  organization: string;
  role: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}