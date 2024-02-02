import Cookies from "js-cookie";

const convertCurrency = (amount, currencyInput) => {
  const rate = currencyInput?.rate;
  const symbol = currencyInput?.symbol;
  if (!amount || !rate) return amount;
  const convertedPrice = Math.round(amount * rate)
  const formattedNumber = convertedPrice.toLocaleString(undefined, { useGrouping: true });
  return `${formattedNumber} ${symbol}`;
};

const loadDefaultCurrency = (currencies) => {
  const params = new URLSearchParams(window.location.search);
  const currencyParam = params.get("currency");
  let currency = currencies.find((item) => item.currency === currencyParam);
  if (currency) {
    Cookies.set("currency", JSON.stringify(currency));
    return currency;
  }
  currency = Cookies.get("currency");
  if (currency) return JSON.parse(currency);
  return currencies[0];
};

export { convertCurrency, loadDefaultCurrency };
