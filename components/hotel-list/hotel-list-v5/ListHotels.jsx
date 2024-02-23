"use client";
import DropdownSelectStar from "@/components/hotel-list/common/DropdownSelectStar";
import Pagination from "@/components/hotel-list/common/Pagination";
import HotelProperties from "@/components/hotel-list/hotel-list-v5/HotelProperties";
import useFilterBar from "@/hooks/useFilterBar";
import useHotelList from "@/hooks/useHotelList";
import useHotelFilterStore from "@/store/useHotelFilterStore";
import useTransStore from "@/store/useTransStore";
import { useEffect } from "react";
import ResultHeader from "./ResultHeader";

export default function ListHotels() {
  const { gapActive, setGapActive, setHotels } = useHotelFilterStore();
  const messages = useTransStore((state) => state.messages);
  const hotelTrans = messages?.Hotel;
  const filterTrans = messages?.FilterBar;
  const { hotels, loading, isExpired } = useHotelList();
  const {
    data,
    totalFilter,
    pagination,
    currentPage,
    setCurrentPage,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    handleRatingFilterChange,
    starFilter,
    handleStarFilterChange,
    resetFilter,
  } = useFilterBar(hotels);

  const renderTooltip = () => {
    if (!hotelTrans?.tooltipCopy) return;
    const Tooltip = require("bootstrap/js/dist/tooltip");
    const copyHotelToolTip = document.getElementById("copyHotelInfoTooltip");
    const shortenLinkToolTip = document.getElementById("shortenLinkTooltip");
    new Tooltip(shortenLinkToolTip, {
      container: "body",
      trigger: "hover",
      title: hotelTrans.shortLink || "",
    });
    new Tooltip(copyHotelToolTip, {
      container: "body",
      trigger: "hover",
      title: hotelTrans.tooltipCopy || "",
    });
  };

  useEffect(() => {
    renderTooltip();
  }, [hotelTrans?.tooltipCopy]);

  useEffect(() => {
    setHotels(hotels);
  }, [hotels.length]);

  return (
    <>
      {/* Top SearchBanner */}
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <div className="row x-gap-20 y-gap-10 items-center">
                <div className="col-auto">
                  <div className="text-18 fw-500">{filterTrans?.filter}</div>
                </div>
                {/* End .col-auto */}

                <div className="col-auto">
                  <div className="row x-gap-15 y-gap-15">
                    <div className="col-auto d-flex align-items-center">
                      <button
                        onClick={resetFilter}
                        className="button -dark-1 bg-blue-1 text-white text-14 rounded-100 px-15 h-34"
                      >
                        <i className="bi bi-arrow-clockwise mr-1">
                          {filterTrans?.reset}
                        </i>
                      </button>
                    </div>
                    <DropdownSelectStar
                      priceFilter={priceFilter}
                      setPriceFilter={setPriceFilter}
                      ratingFilter={ratingFilter}
                      setRatingFilter={handleRatingFilterChange}
                      starFilter={starFilter}
                      setStarFilter={handleStarFilterChange}
                    />
                  </div>
                </div>
                {/* End .col-auto */}
              </div>
              {/* End .row */}
            </div>
            {/* End col-auto */}

            <div className="col-auto">
              <button
                onClick={() => {
                  setGapActive(!gapActive);
                }}
                className={`button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1 ${
                  gapActive && "active"
                }`}
              >
                <i className="icon-up-down text-14 mr-10"></i>
                {filterTrans?.bHotelGap}
              </button>
            </div>
            {/* End col-auto */}

            <div className="border-top-light mt-30 mb-30"></div>
            {/* End border-top */}

            <div className="row y-gap-30 sm:pr-0">
              <ResultHeader loading={loading} isExpired={isExpired} totalResult={totalFilter} />
              <HotelProperties hotels={data} />
            </div>
            {/* End .row */}
            <Pagination
              filterTotalResult={totalFilter}
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
}
