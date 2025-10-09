import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  company: null,
  setCompany: (company) => set({ company }),
  logout: () =>
    set({
      user: null,
      company: null,
    }),
}));
