import { create } from 'zustand';

type useAuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

export const useAuthStore = create<useAuthStore>()(set => ({
  isLoggedIn: false,
  setIsLoggedIn: val => set({ isLoggedIn: val }),
}));
