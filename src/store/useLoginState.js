import { create } from 'zustand';

const defaultState = {
  email: '',
};

export const useLoginState = create(set => ({
  ...defaultState,
  setEmail: value => set({ email: value }),
  resetState: () => set(defaultState),
}));
