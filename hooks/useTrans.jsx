import useTransStore from "@/store/useTransStore";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const useTrans = () => {
  const locale = useLocale();
  const [messages, setMessages] = useState({});

  const loadMessageFromSessionStorage = async (locale) => {
    let trans = sessionStorage.getItem(`trans.${locale}`);
    if (trans) {
      setMessages(JSON.parse(trans));
    } else {
      trans = useTransStore.getState().messages;
      if (trans) {
        sessionStorage.setItem(`trans.${locale}`, JSON.stringify(trans));
        setMessages(trans);
      }
    }
  };

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

  useEffect(() => {
    loadMessageFromSessionStorage(locale);
  }, []);

  return { t, t2 };
};

export default useTrans;
