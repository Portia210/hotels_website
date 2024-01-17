import axios from "axios";
import { useEffect, useState } from "react";

const useCurrency = () => {
  const [click, setClick] = useState(false);
  const handleCurrency = () => setClick((prevState) => !prevState);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const fetchCurrencies = async () => {
    const data = await axios.post(`/api/currency`).then((res) => res.data);
    setCurrencies(data.rates);
    setSelectedCurrency(data.rates[0]);
  };

  const handleItemClick = (item) => {
    setSelectedCurrency(item);
    setClick(false);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return {
    handleCurrency,
    currencies,
    selectedCurrency,
    handleItemClick,
    click,
  };
};

export default useCurrency;
