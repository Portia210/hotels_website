import useHotelFilterStore from '@/store/useHotelFilterStore';
import useHotelNameFilterStore from '@/store/useHotelNameFilterStore';
import { useEffect, useState } from 'react';

export default function HotelNameFilter({ disabled }) {
  const { hotels, setHotels } = useHotelNameFilterStore();
  const {
    hotels: originHotels,
    filterHotels,
    setFilterHotels,
    onFilterHotel,
  } = useHotelFilterStore();
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
        placeholder="Hotel name"
        value={hotelName || ''}
        disabled={disabled}
        onChange={onInputChange}
      />
      <div className="icon-search text-20 mr-10"></div>
    </div>
  );
}
