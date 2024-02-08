"use client";
import useTransStore from "@/store/useTransStore";
import { useLocale } from "next-intl";

const useTrans = () => {
  const messages = useTransStore((state) => state.messages);
  const locale = useLocale();
  const isReverse = locale === "he";

  const t = (key) => {
    if (messages && key) {
      const keys = key.split(".");
      let result = messages;
      for (const k of keys) {
        if (result && result[k]) {
          result = result[k];
        } else {
          return null;
        }
      }
      return result;
    }
    return null;
  };

  /**
   * Translate with custom lang object
   * @param {function} getLangConfig
   * @param {string} key Trans key
   */
  const t2 = (getLangConfig, key) => {
    if (!key || !getLangConfig) return null;
    const langConfig = getLangConfig(locale);
    const keys = key.split(".");
    const messages = langConfig[keys[0]];
    let result = messages;
    for (let i = 1; i < keys.length; i++) {
      if (result && result[keys[i]]) {
        result = result[keys[i]];
      } else {
        return null;
      }
    }
    return result;
  };

  return { t, t2, isReverse };
};

export default useTrans;
