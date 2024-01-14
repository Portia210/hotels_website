"use client";
import DropdownSelelctBar from "@/components/hotel-list/common/DropdownSelelctBar";
import Pagination from "@/components/hotel-list/common/Pagination";
import HotelProperties from "@/components/hotel-list/hotel-list-v5/HotelProperties";
import useHotelList from "@/hooks/useHotelList";
import { useEffect, useState } from "react";

export default function ListHotels() {
  const { hotels, fetchHotelList, loading } = useHotelList();
  const [data, setData] = useState(hotels.slice(0, 36));
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 36,
    totalPages: 1,
  });

  const calcPagination = () => {
    const totalPages = Math.ceil(hotels.length / pagination.limit);
    setPagination((prev) => ({ ...prev, totalPages }));
  };

  useEffect(() => {
    fetchHotelList();
  }, []);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    calcPagination();
  }, [hotels]);

  useEffect(() => {
    const offset = (pagination.page - 1) * pagination.limit;
    const data = hotels.slice(offset, offset + pagination.limit);
    setData(data);
  }, [pagination]);

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
                    <DropdownSelelctBar />
                  </div>
                </div>
                {/* End .col-auto */}
              </div>
              {/* End .row */}
            </div>
            {/* End col-auto */}

            <div className="col-auto">
              <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
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
              totalPages={pagination?.totalPages}
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
