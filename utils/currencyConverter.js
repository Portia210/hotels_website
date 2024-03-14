import Cookies from 'js-cookie';

const convertCurrency = (amount, currencyInput, currency) => {
  let rate = currencyInput?.rate;
  if (currencyInput?.currency === currency) rate = 1;
  const symbol = currencyInput?.symbol;
  if (!amount || !rate) return amount;
  const convertedPrice = Math.round(amount * rate);
  const formattedNumber = convertedPrice.toLocaleString(undefined, {
    useGrouping: true,
  });
  return `${formattedNumber} ${symbol}`;
};

const loadDefaultCurrency = (currencies, defaultCode) => {
  const params = new URLSearchParams(window.location.search);
  const currencyParam = params.get('currency');
  let currency = currencies.find(item => item.currency === currencyParam);
  if (currency) {
    Cookies.set('currency', JSON.stringify(currency));
    return currency;
  }
  currency = Cookies.get('currency');
  if (currency) return JSON.parse(currency);
  currency = currencies.find(item => item.currency === defaultCode);
  return currency || currencies[0];
};

export { convertCurrency, loadDefaultCurrency };
