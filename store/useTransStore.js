import { create } from "zustand";

const useTransStore = create((set) => ({
  messages: null,
  setMessages: (messages) => set(() => ({ messages })),
  t: (key) => {
    const messages = useTransStore.getState().messages;
    if (key) {
      return messages[key] || key;
    }
    return messages;
  },
}));
export default useTransStore;
