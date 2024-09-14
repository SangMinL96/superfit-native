import { create } from 'zustand';

const defaultState = {
  isLogined: 'loading',
};


export const useGlobalState = create(set => ({
  ...defaultState,
  setIsLogined: value => set({ isLogined: value }),
  resetState: () => set(defaultState),
}));
