"use client";

import useTrans from "@/hooks/useTrans";
import useDestinationGalleryStore from "@/store/useDestinationGalleryStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import getLangConfig from "./lang";
const Destinations = () => {
  const { t2, locale, isReverse } = useTrans();
  const { selectedCountry, setSelectedCountry } = useDestinationGalleryStore();
  const [filterOption, setFilterOption] = useState("israelSupporterCountries");
  const [filteredItems, setFilteredItems] = useState([]);
  const filterOptions = [
    {
      label: t2(getLangConfig, "filterOptionLabels.israelSupporter"),
      value: "israelSupporterCountries",
    },
    {
      label: t2(getLangConfig, "filterOptionLabels.europe"),
      value: "europe",
    },
    { label: t2(getLangConfig, "filterOptionLabels.asia"), value: "asia" },
    {
      label: t2(getLangConfig, "filterOptionLabels.other"),
      value: "other",
    },
    // add more options as needed
  ];
  const loadCountries = (filterOption) => {
    let data;
    const countries = [];
    if (filterOption == "israelSupporterCountries") {
      data = getLangConfig(locale).israelSupporterCountries;
    } else if (filterOption == "europe") {
      data = getLangConfig(locale).euroCountries;
    } else if (filterOption == "asia") {
      data = getLangConfig(locale).asiaCountries;
    } else {
      data = getLangConfig(locale).otherCountries;
    }
    for (const key of Object.keys(data)) {
      countries.push({
        value: key,
        label: data[key],
      });
    }
    setFilteredItems(countries);
  };

  const handleLocationSelect = (country) => {
    setSelectedCountry(country);
    const cityGallery = document.getElementById("cityGallery");
    if (cityGallery) {
      cityGallery.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    loadCountries(filterOption);
  }, [filterOption]);

  return (
    <>
      <div
        className={`tabs__controls d-flex js-tabs-controls ${
          isReverse && "flex-row-reverse"
        }`}
      >
        {filterOptions.map((option) => (
          <div key={option.value}>
            <button
              className={`tabs__button ${
                isReverse ? "fw-600" : "fw-500"
              } text-15 px-30 py-15 rounded-4 js-tabs-button ${
                filterOption === option.value ? "is-tab-el-active" : ""
              }`}
              onClick={() => setFilterOption(option.value)}
            >
              {option.label}
            </button>
          </div>
        ))}
      </div>

      <div className="tabs__content pt-30 js-tabs-content">
        <div className="tabs__pane -tab-item-1 is-tab-el-active">
          <div className="row y-gap-20">
            {filteredItems.map((item) => (
              <div
                className="w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
                key={item.value}
              >
                <Link
                  href="#"
                  scroll={false}
                  onClick={() => handleLocationSelect(item)}
                  className={`button -blue-1 bg-white p-2 ${
                    item.label === selectedCountry?.label ? "active" : ""
                  }`}
                  style={{ justifyContent: "flex-start" }}
                  dir={isReverse ? "rtl" : "ltr"}
                >
                  <span className={`text-15 text-nowrap fw-500`}>
                    {item?.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* End .tabs__content */}
    </>
  );
};

export default Destinations;
