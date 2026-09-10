import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  explorerName: string | null;

  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      explorerName: null,
      login: (name: string) => set({ explorerName: name }),
      logout: () => set({ explorerName: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        explorerName: state.explorerName,
      }),
    }
  )
);
