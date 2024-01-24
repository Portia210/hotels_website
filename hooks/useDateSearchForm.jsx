import useSearchStore from "@/store/useSearchStore";
import { loadDateSearch } from "@/utils/searchFormLoader";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useDateSearchForm = () => {
  const router = useRouter();
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
    if (checkInDate && dayjs().subtract(1, "day").isAfter(dayjs(checkInDate))) {
      console.log("setDefault date");
      setDates([dayjs().toDate(), dayjs().add(30, "day").toDate()]);
      router.push("/");
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
