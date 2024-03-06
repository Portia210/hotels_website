import useTrans from '@/hooks/useTrans';
import { useEffect, useState } from 'react';

export default function HotelNameFilter({
  hotelFilterStore,
  hotelNameFilterStore,
  disabled,
}) {
  const { t } = useTrans();
  const { hotels, setHotels } = hotelNameFilterStore;
  const {
    hotels: originHotels,
    filterHotels,
    setFilterHotels,
    onFilterHotel,
  } = hotelFilterStore;
  const [hotelName, setHotelName] = useState('');

  const onInputChange = e => {
    const val = e.target.value;
    setHotelName(val);
  };

  useEffect(() => {
    if (hotelName) {
      const filteredHotels = hotels.filter(hotel => {
        return hotel.title.toLowerCase().includes(hotelName.toLowerCase());
      });
      setFilterHotels(filteredHotels);
    } else {
      setFilterHotels(originHotels);
      onFilterHotel();
    }
  }, [hotelName]);

  useEffect(() => {
    if (!disabled) setHotels(filterHotels);
  }, [disabled]);

  return (
    <div className="d-flex items-center border rounded-pill w-100">
      <input
        className="lh-1 px-10 py-5"
        placeholder={`${t('FilterBar.hotelName')}`}
        value={hotelName || ''}
        disabled={disabled}
        onChange={onInputChange}
      />
      <div className="icon-search text-20 mr-10"></div>
    </div>
  );
}
