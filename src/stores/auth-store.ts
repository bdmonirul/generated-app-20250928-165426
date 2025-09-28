import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AuthState {
  isAuthenticated: boolean;
}
interface AuthActions {
  login: () => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);