import { create } from "zustand";

export const languageContent = [
  {
    id: 1,
    language: "English",
    country: "English",
    code: "en",
    src: "/img/general/lang.png",
  },
  {
    id: 2,
    language: "Hebrew",
    country: "Israel",
    code: "he",
    src: "/img/general/israel.png",
  },
];

const useLanguageStore = create((set) => ({
  language: languageContent[0],
  setLanguage: (language) => set(() => ({ language })),
}));

export default useLanguageStore;
