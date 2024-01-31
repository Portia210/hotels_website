import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import useCurrencyStore from "@/store/useCurrencyStore";
import { loadDefaultCurrency } from "@/utils/currencyConverter";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useCurrency = () => {
  const currencyStore = useCurrencyStore();
  const [click, setClick] = useState(false);
  const handleCurrency = () => setClick((prevState) => !prevState);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();

  const fetchCurrencies = async () => {
    const data = await axios
      .post(`${TOURCOMPARE_BE_URL}/api/v1/currency`, null, {
        withCredentials: true,
      })
      .then((res) => res.data);
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
    if (!currency) return;
    currencyStore.setCurrency(currency);
  };

  useEffect(() => {
    onLoadCurrency();
  }, [selectedCurrency, currencies]);

  return {
    handleCurrency,
    currencies,
    selectedCurrency: currencyStore.currency,
    handleItemClick,
    click,
  };
};

export default useCurrency;
