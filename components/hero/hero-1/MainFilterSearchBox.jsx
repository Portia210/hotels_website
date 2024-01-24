"use client";

import DateSearch from "@/components/hotel-list/common/DateSearch";
import useSearchBar from "@/hooks/useSearchBar";
import GuestSearch from "./GuestSearch";
import LocationSearch from "@/components/hero/hero-1/LocationSearch";

const MainFilterSearchBox = ({ messages }) => {
  console.log("messages", messages);
  const { handleSearch } = useSearchBar();

  return (
    <>
      <div className="position-relative mt-30 md:mt-20 js-tabs-content">
        <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
          <div className="button-grid items-center">
            <LocationSearch messages={messages?.SearchBox}/>
            {/* End Location */}

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  {messages?.SearchBox?.checkin} - {messages?.SearchBox?.checkout}
                </h4>
                <DateSearch messages={messages?.SearchBox}/>
              </div>
            </div>
            {/* End check-in-out */}

            <GuestSearch />
            {/* End guest */}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-blue-1 text-white"
                onClick={() => handleSearch("/hotel-list")}
              >
                <i className="icon-search text-20 mr-10" />
                {messages?.SearchBox?.search}
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
        {/* End .mainSearch */}
      </div>
      {/* End serarchbox tab-content */}
    </>
  );
};

export default MainFilterSearchBox;
