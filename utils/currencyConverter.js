const convertCurrency = (amount, currencyInput) => {
  const { rate, currency } = currencyInput;
  if (!amount || !rate) return amount;
  const convertedPrice = Math.round(amount * rate);
  return `${convertedPrice} ${currency}`;
};
export { convertCurrency };
