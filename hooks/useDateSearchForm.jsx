import useSearchStore from "@/store/useSearchStore";
import { loadDateSearch } from "@/utils/searchFormLoader";
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
    searchStore.setDateSearch(dates);
  };

  const onPropsChange = (dates) => {
    if (dates.value.length === 2) {
      setDates(dates.value);
    }
  };

  const onLoadDateSearch = async () => {
    if (pathName !== "/hotel-list") return;
    const { checkInDate, checkOutDate } = loadDateSearch();
    if (checkInDate && checkOutDate) {
      setDates([dayjs(checkInDate).toDate(), dayjs(checkOutDate).toDate()]);
    }
  };

  useEffect(() => {
    updateSearchInput();
  }, [dates]);

  useEffect(() => {
    onLoadDateSearch();
  }, [pathName]);

  return {
    dates,
    onPropsChange,
  };
};

export default useDateSearchForm;
