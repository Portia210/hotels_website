"use client";

import useLanguageStore, { languageContent } from "@/store/useLanguageStore";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LanguageMobileMenu = ({ textClass, textTran, isReverse }) => {
  const router = useRouter();
  const locale = useLocale();
  const [click, setClick] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  const onClick = () => setClick((prevState) => !prevState);

  const handleLanguageClick = (language) => {
    const url = window.location.href;
    const newUrl = url.replace(
      `${window.location.origin}/${locale}`,
      `${window.location.origin}/${language.code}`
    );
    router.replace(newUrl);
  };

  const loadLanguage = () => {
    let language = languageContent.find((item) => item.code === locale);
    if (language) {
      setLanguage(language);
    }
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <>
      {/* Start language currency Selector */}
      <div
        className="col-auto py-10"
        style={isReverse ? { marginLeft: 4 } : { marginRight: 10 }}
      >
        <button
          className={`d-flex items-center text-16 ${textClass}`}
          onClick={() => setClick((prevState) => !prevState)}
        >
          <span className={`${isReverse ? "ms-2 me-3" : "ms-3 me-2"} text-16 `}>
            {textTran}
          </span>{" "}
          <Image
            width={20}
            height={20}
            src={language?.src}
            alt="image"
            className={`rounded-full ${isReverse ? "ml-5" : "mr-10"}`}
          />
          <span className="js-language-mainTitle">{language?.language}</span>
          <i className={`icon-chevron-sm-down text-7 ${isReverse ? 'mr-10': 'ml-15'}`} />
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
                <Link href={`#`} locale={item.code}>
                  <div className="py-10 px-15 sm:px-5 sm:py-5">
                    <div className="text-15 lh-15 fw-500 text-dark-1">
                      {item?.language}
                    </div>
                    <div className="text-14 lh-15 mt-5 js-title">
                      {item?.country}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default LanguageMobileMenu;
