"use client";
import DropdownSelelctBar from "@/components/hotel-list/common/DropdownSelelctBar";
import Pagination from "@/components/hotel-list/common/Pagination";
import HotelProperties from "@/components/hotel-list/hotel-list-v5/HotelProperties";
import { PriceFilter } from "@/constants/searchFilter";
import useHotelList from "@/hooks/useHotelList";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";

export default function ListHotels() {
  const { hotels, fetchHotelList, loading } = useHotelList();
  const [data, setData] = useState(hotels.slice(0, 36));
  const [priceFilter, setPriceFilter] = useState(PriceFilter.HTL);
  const [ratingFilter, setRatingFilter] = useState(6);
  const [starFilter, setStarFilter] = useState([3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 36,
    totalPages: 1,
    totalResults: 1,
    offset: 0,
  });

  const calcPagination = () => {
    const totalPages = Math.ceil(hotels.length / pagination.limit);
    const totalResults = hotels.length;
    setPagination((prev) => ({ ...prev, totalPages, totalResults }));
  };

  const calcHotelData = (hotelData) => {
    let data = [];
    if (!hotelData) {
      data = hotels.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      );
    } else {
      data = hotelData.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      );
    }
    setData(data);
  };

  const handleStarFilterChange = (value) => {
    setStarFilter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((star) => star !== value);
      }
      return [...prev, value];
    });
  };

  const filterHotelByPrice = () => {
    const cloneHotels = cloneDeep(hotels);
    if (priceFilter === PriceFilter.HTL) {
      cloneHotels.sort((a, b) => b.travelorPrice - a.travelorPrice);
    } else {
      cloneHotels.sort((a, b) => a.travelorPrice - b.travelorPrice);
    }
    calcHotelData(cloneHotels);
  };

  const filterHotelByRating = () => {
    const cloneHotels = cloneDeep(hotels);
    const filterHotels = cloneHotels.filter(
      (hotel) => hotel.rate >= ratingFilter
    );
    calcHotelData(filterHotels);
  };

  const filterHotelByStar = () => {
    const cloneHotels = cloneDeep(hotels);
    const filterHotels = cloneHotels.filter((hotel) => {
      if (starFilter.length === 0) return true;
      return starFilter.includes(hotel.stars);
    });
    calcHotelData(filterHotels);
  };

  const filterByBiggestPriceGap = () => {
    const cloneHotels = cloneDeep(hotels);
    cloneHotels.sort((a, b) => b.price_difference - a.price_difference);
    calcHotelData(cloneHotels);
  };

  useEffect(() => {
    fetchHotelList();
  }, []);

  useEffect(() => {
    const offset = (currentPage - 1) * pagination.limit;
    setPagination((prev) => ({ ...prev, page: currentPage, offset }));
  }, [currentPage]);

  useEffect(() => {
    calcPagination();
  }, [hotels]);

  useEffect(() => {
    calcHotelData();
  }, [pagination]);

  useEffect(() => {
    filterHotelByPrice();
  }, [priceFilter]);

  useEffect(() => {
    filterHotelByRating();
  }, [ratingFilter]);

  useEffect(() => {
    filterHotelByStar();
  }, [starFilter]);

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
