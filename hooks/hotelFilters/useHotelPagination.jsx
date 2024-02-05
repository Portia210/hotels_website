import { useEffect, useState } from "react";
import { defaultFilter, hotelPerPage } from ".";

const useHotelPagination = () => {
  const [active, setActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(defaultFilter.pagination);

  const calcPagination = (hotelLength) => {
    const totalPages = Math.ceil(hotelLength / pagination.limit);
    const totalResults = hotelLength;
    if (totalResults < hotelPerPage) {
      setPagination(() => ({ ...defaultFilter.pagination }));
    } else {
      setPagination((prev) => ({ ...prev, totalPages, totalResults }));
    }
  };

  useEffect(() => {
    const offset = (currentPage - 1) * pagination.limit;
    setPagination((prev) => ({ ...prev, page: currentPage, offset }));
  }, [currentPage]);

  return {
    active,
    currentPage,
    pagination,
    setActive,
    setPagination,
    setCurrentPage,
    calcPagination,
  };
};

export default useHotelPagination;
