import * as en from "./en";
import * as he from "./he";

export default function getLangConfig(locale) {
  switch (locale) {
    case "en":
      return en;
    case "he":
      return he;
    default:
      return en;
  }
}
