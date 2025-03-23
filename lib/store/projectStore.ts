import { create } from 'zustand';

type ProjectState = {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  isAdmin: false, // 기본값: 관리자 아님
  setIsAdmin: (value) => set({ isAdmin: value }),
}));
