import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: async (userData) => {
        const users = get().users;
        const exists = users.some((u) => u.email === userData.email);
        
        if (exists) {
          return false;
        }

        const newUser = {
          ...userData,
          id: crypto.randomUUID(),
        };

        set((state) => ({
          users: [...state.users, newUser],
        }));

        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
    }
  )
);