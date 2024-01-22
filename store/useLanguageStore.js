import { create } from "zustand";

export const languageContent = [
  {
    id: 1,
    language: "English",
    country: "English",
    src: "/img/general/lang.png",
  },
  {
    id: 2,
    language: "Hebrew",
    country: "Israel",
    src: "/img/general/israel.png",
  },
];

const useLanguageStore = create((set) => ({
  language: languageContent[0],
  isReverse: false,
  setLanguage: (language) =>
    set((state) => {
      if (language.language === "Hebrew") {
        state.isReverse = true;
      } else {
        state.isReverse = false;
      }
      state.language = language;
      return language;
    }),
}));
export default useLanguageStore;
