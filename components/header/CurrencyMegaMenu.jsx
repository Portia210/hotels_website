"use client";

import useCurrency from "@/hooks/useCurrency";

const CurrencyMegaMenu = ({ textClass }) => {

  const {
    handleCurrency,
    currencies,
    selectedCurrency,
    handleItemClick,
    click,
  } = useCurrency();

  return (
    <>
      {/* Start currencty dropdown wrapper */}
      <div className="col-auto">
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={handleCurrency}
        >
          <span className="js-currencyMenu-mainTitle">
            {selectedCurrency?.currency}
          </span>
          <i className="icon-chevron-sm-down text-7 ml-10" />
        </button>
      </div>
      {/* End currencty dropdown wrapper */}

      <div
        className={`currencyMenu js-currencyMenu pt-120 ${click ? "" : "is-hidden"}`}
      >
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div
          className="currencyMenu__content bg-white rounded-4"
          style={{ width: "80%" }}
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
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {currencies.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  selectedCurrency?.currency === item.currency ? "active" : ""
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

export default CurrencyMegaMenu;
