import { useTranslations } from "next-intl";

const { useLocale } = require("next-intl");

const useTransServer = () => {
  const locale = useLocale();
  const isReverse = locale === "he";
  const t = useTranslations();
  return {
    t,
    locale,
    isReverse,
  };
};

export default useTransServer;
