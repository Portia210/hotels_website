import { create } from "zustand";

const useTransStore = create((set) => ({
  messages: null,
  setMessages: (newMessages) => set({ messages: newMessages })
}));

export default useTransStore;
