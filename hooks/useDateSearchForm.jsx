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
    const { checkInDate, checkOutDate } = loadDateSearch(pathName);
    if (
      dayjs().isAfter(dayjs(checkInDate)) ||
      dayjs().isAfter(dayjs(checkOutDate))
    ) {
      return setDates([dayjs().toDate(), dayjs().add(30, "day").toDate()]);
    } else if (checkInDate && checkOutDate) {
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
