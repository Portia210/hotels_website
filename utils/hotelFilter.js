import { PriceFilter } from '@/constants/searchFilter';

const filterHotelByPrice = (filterType = PriceFilter.HTL, hotels) => {
  console.log('filterType', filterType);
  console.log('hotels', hotels);
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

const filterHotelV2 = (condition, hotels, ignoresKeys = []) => {
  let results = hotels;
  const filters = {
    ratingFilter: filterHotelByRating,
    starFilter: filterHotelByStar,
    priceFilter: results => {
      return filterHotelByPrice(condition.priceFilter, results);
    },
    priceGapFilter: results => filterByBiggestPriceGap(results),
    distanceFilter: (results, filter) =>
      filterAndSortHotels(results, filter, condition.distanceSortOrder),
    distanceSortOrder: (results, filter) =>
      filterAndSortHotels(results, condition.distanceFilter, filter),
  };

  for (const key in filters) {
    if (condition[key]) {
      results = filters[key](results, condition[key]);
      ignoresKeys.push(key);
    }
  }
  return results;
};

const filterAndSortHotels = (hotels, distance, sortOrder) => {
  if (!distance) return [];
  let filteredDistanceHotels = hotels.filter(hotel => {
    const hotelDistance = hotel?.travelorDistance ?? 0;
    return hotelDistance * 1000 <= distance;
  });

  if (sortOrder === 'asc') {
    filteredDistanceHotels.sort(
      (a, b) => a.travelorDistance - b.travelorDistance,
    );
  } else if (sortOrder === 'desc') {
    filteredDistanceHotels.sort(
      (a, b) => b.travelorDistance - a.travelorDistance,
    );
  }
  return filteredDistanceHotels;
};

export {
  filterAndSortHotels,
  filterByBiggestPriceGap,
  filterHotelV2,
  filterHotelByPrice,
  filterHotelByRating,
  filterHotelByStar,
};
