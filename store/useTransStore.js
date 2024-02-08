import { create } from "zustand";

const useTransStore = create((set) => ({
  messages: null,
  setMessages: (messages) => set({ messages }),
}));

export default useTransStore;
