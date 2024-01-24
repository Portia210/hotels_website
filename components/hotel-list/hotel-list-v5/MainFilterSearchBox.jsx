"use client";

import GuestSearch from "@/components/hero/hero-1/GuestSearch";
import LocationSearch from "@/components/hero/hero-1/LocationSearch";
import useSearchBar from "@/hooks/useSearchBar";
import DateSearch from "../common/DateSearch";

const MainFilterSearchBox = ({ messages }) => {
  const { handleSearch } = useSearchBar();

  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center">
          <LocationSearch messages={messages?.SearchBox} />
          {/* End Location */}

          <div className="searchMenu-date px-30 lg:py-20  sm:px-20 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">
                {messages?.SearchBox?.checkin} - {messages?.SearchBox?.checkout}
              </h4>
              <DateSearch />
            </div>
          </div>
          {/* End check-in-out */}

          <GuestSearch />
          {/* End guest */}

          <div className="button-item h-full">
            <button
              onClick={() => handleSearch("/hotel-list")}
              className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-blue-1 text-white"
            >
              <i className="icon-search text-20 mr-10" />
                { messages?.SearchBox?.search }
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
