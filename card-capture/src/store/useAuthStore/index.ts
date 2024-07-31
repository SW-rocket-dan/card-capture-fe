import { create } from 'zustand';

type useAuthStore = {
  isLoggedIn: boolean;
  isModalOpen: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsModalOpen: (IsModalOpen: boolean) => void;
};

export const useAuthStore = create<useAuthStore>()(set => ({
  isLoggedIn: false,
  isModalOpen: false,
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  setIsModalOpen: isModalOpen => set({ isModalOpen }),
}));
