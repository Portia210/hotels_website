import useTransStore from "@/store/useTransStore";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const useTrans = () => {
  const locale = useLocale();
  const [messages, setMessages] = useState();

  const loadMessageFromSessionStorage = async (locale) => {
    let trans = sessionStorage.getItem(`trans.${locale}`);
    if (trans) {
      setMessages(JSON.parse(trans));
    } else {
      trans = useTransStore.getState().messages;
      console.log("trans -->", trans);
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

  useEffect(() => {
    loadMessageFromSessionStorage(locale);
  }, []);

  return { t };
};

export default useTrans;
