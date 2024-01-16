"use client";

import useDateSearchForm from "@/hooks/useDateSearchForm";
import DatePicker from "react-multi-date-picker";

const DateSearch = () => {
  const { dates, onPropsChange } = useDateSearchForm();

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        highlightToday={false}
        minDate={new Date()}
        onPropsChange={onPropsChange}
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
