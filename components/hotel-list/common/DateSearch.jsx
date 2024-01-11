"use client";

import useSearchStore from "@/store/useSearchStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";

const DateSearch = () => {
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

  useEffect(() => {
    updateSearchInput();
  }, [dates]);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        highlightToday={false}
        minDate={new Date()}
        onChange={setDates}
        onOpenPickNewDate={false}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
      />
    </div>
  );
};

export default DateSearch;
