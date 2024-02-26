import { PriceFilter } from '@/constants/searchFilter';

const filterHotelByPrice = (filterType = PriceFilter.HTL, hotels) => {
  let results = [];
  if (filterType === PriceFilter.HTL) {
    results = hotels.sort((a, b) => b.travelorPrice - a.travelorPrice);
  } else {
    results = hotels.sort((a, b) => a.travelorPrice - b.travelorPrice);
  }
  return results;
};

const filterByBiggestPriceGap = hotels => {
  const results = hotels.sort(
    (a, b) => b.price_difference - a.price_difference,
  );
  return results;
};

const filterHotelByRating = (hotels, ratingFilter) => {
  const results = hotels.filter(hotel => hotel.rate >= ratingFilter);
  return results;
};

const filterHotelByStar = (hotels, starFilter) => {
  const results = hotels.filter(hotel => hotel.stars >= starFilter);
  return results;
};

const filterHotel = (condition, hotels) => {
  let results = hotels;
  if (condition.ratingFilter) {
    results = filterHotelByRating(results, condition.ratingFilter);
  }
  if (condition.starFilter) {
    results = filterHotelByStar(results, condition.starFilter);
  }
  if (condition.priceFilter) {
    results = filterHotelByPrice(condition.priceFilter, results);
  }
  if (condition.priceGapFilter) {
    results = filterByBiggestPriceGap(results);
  }
  return results;
};

export {
    filterByBiggestPriceGap, filterHotel,
    filterHotelByPrice,
    filterHotelByRating,
    filterHotelByStar
};

