import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  loadingText: string;
  setIsLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingText: "Loading...",
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setLoadingText: (text: string) => set({ loadingText: text }),
}));
