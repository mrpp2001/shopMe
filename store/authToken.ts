import { create } from "zustand";

interface State {
  authToken: string;
  setAuthToken: (token: string) => void;
}

export const useStore = create<State>((set) => ({
  authToken: "",
  setAuthToken: (token: string) => set({ authToken: token }),
}));
