import DatePicker from 'react-multi-date-picker';
import { useState } from 'react';
import dayjs from 'dayjs';
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function AddUpdatePlanForm() {
  const [dates, setDates] = useState([
    new Date(),
    dayjs().add(3, 'day').toDate(),
  ]);

  const onDateChange = dates => {
    console.log('dates::', dates);
  };

  return (
    <div className="row">
      <div>
        <label htmlFor="planName" className="form-label">
          Plan Name
        </label>
        <input
          type="text"
          className="form-control border"
          id="planName"
          placeholder="Enter Plan Name"
        />
      </div>
      <div>
        <label htmlFor="price" className="form-label">
          Plan Price
        </label>
        <input
          type="text"
          className="form-control border"
          id="price"
          placeholder="Enter Price"
        />
      </div>
      <div>
        <label htmlFor="duration" className="form-label">
          Duration
        </label>
        <input
          type="text"
          className="form-control border"
          id="price"
          placeholder="Enter Plan Duration"
        />
      </div>
      <div>
        <label htmlFor="position" className="form-label">
          Position
        </label>
        <input
          type="text"
          className="form-control border"
          id="position"
          placeholder="Enter Plan Position"
        />
      </div>
      <div className="col-12">
        <label htmlFor="date" className="form-label">
          Start - End Date
        </label>
        <div className="single-field relative d-flex items-center">
          <DatePicker
            inputClass="custom_input-picker"
            containerClassName="w-full custom_container-picker date-input bg-white text-dark-1 h-50 rounded-8 pl-30 border"
            value={dates}
            minDate={new Date()}
            onChange={setDates}
            numberOfMonths={1}
            highlightToday={false}
            offsetY={10}
            range
            rangeHover
            format="YYYY-MM-DD HH:mm:ss"
            plugins={[
              <TimePicker key={1} position="bottom" />
            ]}           
          />

          <button className="absolute d-flex items-center h-full pointer-events-none">
            <i className="icon-calendar text-20 px-15 text-dark-1" />
          </button>
        </div>
      </div>
      <div className="row py-20">
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isPromo">Promo Plan</label>
          <input type="checkbox" className="border w-auto" id="isPromo" />
        </div>
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isCustomOffer">Custom Offer</label>
          <input type="checkbox" className="border w-auto" id="isCustomOffer" />
        </div>
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isDefault">Default</label>
          <input type="checkbox" className="border w-auto" id="isDefault" />
        </div>
      </div>
    </div>
  );
}
