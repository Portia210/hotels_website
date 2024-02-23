"use client";

import { PriceFilter } from "@/constants/searchFilter";
import RatingFilter from "./RatingFilter";
import useTransStore from "@/store/useTransStore";

const DropdownSelectStar = ({
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
  starFilter,
  setStarFilter,
}) => {
  const messages = useTransStore((state) => state.messages);
  const filterTrans = messages?.FilterBar;
  const dropdowns = [
    {
      title: PriceFilter.HTL,
      value: priceFilter,
      options: [PriceFilter.HTL, PriceFilter.LTH],
      onChange: setPriceFilter,
    },
  ];

  const renderText = (key) => {
    if (key === PriceFilter.HTL) return filterTrans?.htl;
    return filterTrans?.lth;
  };

  return (
    <>
      {dropdowns.map((dropdown, index) => (
        <div className="col-auto" key={index}>
          <div className="dropdown js-dropdown js-amenities-active pl-2 pr-2">
            <div
              className="dropdown__button d-flex items-center text-14 rounded-100 border-light px-20 h-34"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
              data-bs-offset="0,10"
            >
              <span className="js-dropdown-title">
                {renderText(dropdown.value)}
              </span>
              <i className="icon icon-chevron-sm-down text-7 ml-10" />
            </div>
            {/* End dropdown__button */}

            <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
              <div className="text-15 y-gap-15 js-dropdown-list">
                {dropdown.options.map((item, index) => (
                  <div key={index}>
                    <button
                      className={`${
                        item === dropdown.value ? "text-blue-1 " : ""
                      }d-block js-dropdown-link`}
                      onClick={() => dropdown.onChange(item)}
                    >
                      {renderText(item)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* End dropdown-menu */}
          </div>
          {/* End dropdown */}
        </div>
      ))}

      <RatingFilter
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        starFilter={starFilter}
        setStarFilter={setStarFilter}
      />

      {/* End  ratings */}

      {/* End .col-auto */}
    </>
  );
};

export default DropdownSelectStar;
