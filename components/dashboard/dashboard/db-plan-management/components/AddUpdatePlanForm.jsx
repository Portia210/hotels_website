import { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

export default function AddUpdatePlanForm({ action, plan, setPlan }) {
  const [dates, setDates] = useState([]);

  const onFormChange = (key, value) => {
    setPlan({ ...plan, [key]: value });
  };

  const onDateChange = dates => {
    onFormChange('date', {
      startDate: dates[0]?.toDate(),
      endDate: dates[1]?.toDate(),
    });
    setDates(dates);
  };

  useEffect(() => {
    if (plan?.startDate && plan?.endDate) {
      setDates([new Date(plan.startDate), new Date(plan.endDate)]);
    }
  }, [plan]);

  useEffect(() => {
    if (action !== 'DELETE') {
      setPlan(null);
    }
  }, [action]);

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
          value={plan?.label}
          onChange={e => onFormChange('label', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price" className="form-label">
          Plan Price
        </label>
        <input
          type="number"
          className="form-control border"
          id="price"
          placeholder="Enter Price"
          value={plan?.price}
          onChange={e => onFormChange('price', parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="duration" className="form-label">
          Duration
        </label>
        <input
          type="number"
          min={0}
          max={31}
          className="form-control border"
          id="duration"
          placeholder="Enter Plan Duration"
          value={plan?.duration}
          onChange={e => onFormChange('duration', parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="position" className="form-label">
          Position
        </label>
        <input
          type="number"
          min={0}
          max={3}
          className="form-control border"
          id="position"
          placeholder="Enter Plan Position"
          value={plan?.position}
          onChange={e => onFormChange('position', parseFloat(e.target.value))}
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
            onChange={onDateChange}
            numberOfMonths={1}
            highlightToday={false}
            offsetY={10}
            range
            rangeHover
            format="YYYY-MM-DD HH:mm:ss"
            plugins={[<TimePicker key={1} position="bottom" />]}
          />

          <button className="absolute d-flex items-center h-full pointer-events-none">
            <i className="icon-calendar text-20 px-15 text-dark-1" />
          </button>
        </div>
      </div>
      <div className="row py-20">
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isPromo">Promo Plan</label>
          <input
            type="checkbox"
            className="border w-auto"
            id="isPromo"
            value={plan?.isPromo}
            onChange={e => onFormChange('isPromo', e.target.checked)}
          />
        </div>
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isCustomOffer">Custom Offer</label>
          <input
            type="checkbox"
            className="border w-auto"
            id="isCustomOffer"
            value={plan?.isCustomOffer}
            onChange={e => onFormChange('isCustomOffer', e.target.checked)}
          />
        </div>
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isDefault">Default</label>
          <input
            type="checkbox"
            className="border w-auto"
            id="isDefault"
            value={plan?.isDefault}
            onChange={e => onFormChange('isDefault', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
