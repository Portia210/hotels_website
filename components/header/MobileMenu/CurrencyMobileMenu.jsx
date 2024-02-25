'use client';

import useCurrency from '@/hooks/useCurrency';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const CurrencyMobileMenu = ({ textClass, textTran, isReverse }) => {
  const [currencies, setCurrencies] = useState([]);

  const {
    fetchCurrencies,
    handleCurrency,
    selectedCurrency,
    handleItemClick,
    click,
  } = useCurrency(currencies);

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchCurrencies'],
    queryFn: () => fetchCurrencies(),
  });

  useEffect(() => {
    if (data) setCurrencies(data.rates);
  }, [data]);

  return (
    <>
      {/* Start currencty dropdown wrapper */}
      <div
        className="col-auto py-10"
        style={isReverse ? { marginLeft: 4 } : { marginRight: 10 }}
      >
        <button
          className={`d-flex items-center text-16 ${textClass}`}
          onClick={handleCurrency}
        >
          <span className="js-currencyMenu-mainTitle">
            <span
              className={`${isReverse ? 'ms-2 me-3' : 'ms-3 me-2'} text-18 `}
            >
              {textTran}
            </span>
            {selectedCurrency?.currency}
          </span>
          <i
            className={`icon-chevron-sm-down text-7 ${
              isReverse ? 'mr-10' : 'ml-10'
            }`}
          />
        </button>
      </div>
      {/* End currencty dropdown wrapper */}

      <div
        className={`currencyMenu js-currencyMenu ${click ? '' : 'is-hidden'}`}
      >
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div
          className="currencyMenu__content bg-white rounded-4"
          style={{ width: '100%' }}
        >
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">Select your currency</div>
            {/* End Title */}

            <button className="pointer" onClick={handleCurrency}>
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* End flex wrapper */}
          <ul className="px-30 py-30 sm:px-15 sm:py-15">
            {currencies.map(item => (
              <li
                className={`js-item ${
                  selectedCurrency?.currency === item.currency ? 'active' : ''
                }`}
                key={item.currency}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.name}
                  </div>
                  <div className="text-14 lh-15 mt-5">{item.currency}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CurrencyMobileMenu;
