import useSearchStore from "@/store/useSearchStore";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useDateSearchForm = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
  const [dates, setDates] = useState([
    dayjs().toDate(),
    dayjs().add(30, "day").toDate(),
  ]);

  const updateSearchInput = () => {
    let searchInput = searchStore.searchInput;
    searchInput.checkInDate = dayjs(dates[0])?.format("YYYY-MM-DD");
    searchInput.checkOutDate = dayjs(dates[1])?.format("YYYY-MM-DD");
    searchStore.setSearchInput(searchInput);
  };

  const onPropsChange = (dates) => {
    if (dates.value.length === 2) {
      setDates(dates.value);
    }
  };

  const loadDateSearch = async () => {
    if (pathName !== "/hotel-list") return;
    const params = new URLSearchParams(window.location.search);
    const checkInDate = params.get("checkInDate");
    const checkOutDate = params.get("checkOutDate");
    if (checkInDate && checkOutDate) {
      setDates([dayjs(checkInDate).toDate(), dayjs(checkOutDate).toDate()]);
    }
  };

  useEffect(() => {
    updateSearchInput();
  }, [dates]);

  useEffect(() => {
    loadDateSearch();
  }, [pathName]);

  return {
    dates,
    onPropsChange,
  };
};

export default useDateSearchForm;
