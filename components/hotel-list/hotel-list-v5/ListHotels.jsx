"use client";
import DropdownSelelctBar from "@/components/hotel-list/common/DropdownSelelctBar";
import Pagination from "@/components/hotel-list/common/Pagination";
import HotelProperties from "@/components/hotel-list/hotel-list-v5/HotelProperties";
import useFilterBar from "@/hooks/useFilterBar";
import useHotelList from "@/hooks/useHotelList";
import { useEffect } from "react";

export default function ListHotels() {
  const { hotels, fetchHotelList, loading } = useHotelList();
  const {
    data,
    filterByBiggestPriceGap,
    pagination,
    currentPage,
    setCurrentPage,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    setRatingFilter,
    starFilter,
    handleStarFilterChange,
    resetFilter,
  } = useFilterBar(hotels);

  useEffect(() => {
    setTimeout(() => {
      fetchHotelList();
    }, 50);
  }, []);

  return (
    <>
      {/* Top SearchBanner */}
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <div className="row x-gap-20 y-gap-10 items-center">
                <div className="col-auto">
                  <div className="text-18 fw-500">Filter</div>
                </div>
                {/* End .col-auto */}

                <div className="col-auto">
                  <div className="row x-gap-15 y-gap-15">
                    <div className="col-auto d-flex align-items-center">
                      <button
                        onClick={resetFilter}
                        className="button -dark-1 bg-blue-1 text-white text-14 rounded-100 px-15 h-34"
                      >
                        <i className="bi bi-arrow-clockwise mr-1">Reset</i>
                      </button>
                    </div>
                    <DropdownSelelctBar
                      priceFilter={priceFilter}
                      setPriceFilter={setPriceFilter}
                      ratingFilter={ratingFilter}
                      setRatingFilter={setRatingFilter}
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
                onClick={filterByBiggestPriceGap}
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10"></i>
                Top picks for your search
              </button>
            </div>
            {/* End col-auto */}

            <div className="border-top-light mt-30 mb-30"></div>
            {/* End border-top */}

            <div className="row y-gap-30">
              <HotelProperties hotels={data} loading={loading} />
            </div>
            {/* End .row */}
            <Pagination
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
