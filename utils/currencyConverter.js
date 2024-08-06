import useCurrencyStore from '@/store/useCurrencyStore';
import Cookies from 'js-cookie';

const convertCurrency = (amount, currencyOutput, currencyInputKey) => {
  const rate = currencyOutput?.rate;
  if (!amount || !rate) return amount;
  const defaultAmount = convertToDefaultCurrency(amount, currencyInputKey);
  const convertedPrice = Math.round(defaultAmount * rate);
  const formattedNumber = convertedPrice.toLocaleString(undefined, {
    useGrouping: true,
  });
  return `${formattedNumber} ${currencyOutput.symbol}`;
};

// Convert amount to default currency (USD)
const convertToDefaultCurrency = (amount, currencyInputKey) => {
  const currencies = useCurrencyStore.getState().currencies;
  const defaultCurrency = currencies.find(item => item.currency === 'USD');
  const currencyInput = currencies.find(
    item => item.currency === currencyInputKey,
  );
  let rate = currencyInput?.rate ?? 1;
  if (defaultCurrency.currency === currencyInputKey) rate = 1;
  if (!amount || !rate) return amount;
  return amount / rate;
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
