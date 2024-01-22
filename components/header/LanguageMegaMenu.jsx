"use client";

import useLanguageStore, { languageContent } from "@/store/useLanguageStore";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

const LanguageMegaMenu = ({ textClass }) => {
  const [click, setClick] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  const onClick = () => setClick((prevState) => !prevState);

  const handleLanguageClick = (language) => {
    Cookies.set("language", JSON.stringify(language));
    setLanguage(language);
    setClick(false);
  };

  const loadLanguage = () => {
    let language = Cookies.get("language");
    if (language) {
      language = JSON.parse(language);
      console.log("language:: set", language);
      setLanguage(language);
    }
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <>
      {/* Start language currency Selector */}
      <div className="col-auto">
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={() => setClick((prevState) => !prevState)}
        >
          <Image
            width={20}
            height={20}
            src={language?.src}
            alt="image"
            className="rounded-full mr-10"
          />
          <span className="js-language-mainTitle"> {language?.language}</span>
          {/* <i className="icon-chevron-sm-down text-7 ml-15" /> */}
        </button>
      </div>
      {/* End language currency Selector */}

      <div className={`langMenu js-langMenu ${click ? "" : "is-hidden"}`}>
        <div className="currencyMenu__bg" onClick={onClick}></div>
        <div className="langMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">Select your language</div>
            {/* End title */}
            <button className="pointer" onClick={onClick}>
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* Emd flex-wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {languageContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  language?.country === item.country ? "active" : ""
                }`}
                style={{ height: "fit-content" }}
                key={item.id}
                onClick={() => handleLanguageClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.language}
                  </div>
                  <div className="text-14 lh-15 mt-5 js-title">
                    {item.country}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default LanguageMegaMenu;
