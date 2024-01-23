import Cookies from "js-cookie";

const convertCurrency = (amount, currencyInput) => {
  const rate = currencyInput?.rate;
  const currency = currencyInput?.currency;
  if (!amount || !rate) return amount;
  const convertedPrice = Math.round(amount * rate);
  return `${convertedPrice} ${currency}`;
};

const loadDefaultCurrency = (currencies) => {
  let currency = Cookies.get("currency");
  if (currency) return JSON.parse(currency);
  return currencies[0];
};

export { convertCurrency, loadDefaultCurrency };
