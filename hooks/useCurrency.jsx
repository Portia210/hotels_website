import useCurrencyStore from "@/store/useCurrencyStore";
import { loadDefaultCurrency } from "@/utils/currencyConverter";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

const useCurrency = () => {
  const currencyStore = useCurrencyStore();
  const [click, setClick] = useState(false);
  const handleCurrency = () => setClick((prevState) => !prevState);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();

  const fetchCurrencies = async () => {
    const data = await axios.post(`/api/currency`).then((res) => res.data);
    setCurrencies(data.rates);
  };

  const handleItemClick = (item) => {
    Cookies.set("currency", JSON.stringify(item), {
      expires: 30,
    });
    setSelectedCurrency(item);
    setClick(false);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const onLoadCurrency = () => {
    const currency = loadDefaultCurrency(currencies);
    currencyStore.setCurrency(currency);
  };

  useEffect(() => {
    onLoadCurrency();
  }, [selectedCurrency]);

  return {
    handleCurrency,
    currencies,
    selectedCurrency: currencyStore.currency,
    handleItemClick,
    click,
  };
};

export default useCurrency;
