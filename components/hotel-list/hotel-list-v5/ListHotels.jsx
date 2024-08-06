'use client';
import DropdownSelectStar from '@/components/hotel-list/common/DropdownSelectStar';
import Pagination from '@/components/hotel-list/common/Pagination';
import HotelProperties from '@/components/hotel-list/hotel-list-v5/HotelProperties';
import useFilterBar from '@/hooks/useFilterBar';
import useHotelList from '@/hooks/useHotelList';
import useTrans from '@/hooks/useTrans';
import useHotelFilterStore from '@/store/useHotelFilterStore';
import useHotelNameFilterStore from '@/store/useHotelNameFilterStore';
import { useEffect } from 'react';
import HotelNameFilter from './HotelNameFilter';
import HotelTabs from './HotelTabs';
import ResultHeader from './ResultHeader';
import DistanceFilter from '../common/DistanceFilter';

export default function ListHotels() {
  const { t } = useTrans();
  const hotelFilterStore = useHotelFilterStore();
  const hotelNameFilterStore = useHotelNameFilterStore();
  const { hotels, loading, isExpired } = useHotelList();
  const { gapActive, setGapActive, setHotels } = hotelFilterStore;
  const {
    data,
    totalFilter,
    pagination,
    currentPage,
    setCurrentPage,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    handleRatingFilterChange,
    starFilter,
    handleStarFilterChange,
    distanceFilter,
    distanceSortOrder,
    setDistanceFilter,
    setDistanceSortOrder,
    resetFilter,
  } = useFilterBar(hotels);

  const renderTooltip = () => {
    if (!t('Hotel.tooltipCopy')) return;
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const copyHotelToolTip = document.getElementById(
      'copyHotelInfoTooltip_matches',
    );
    const shortenLinkToolTip = document.getElementById(
      'shortenLinkTooltip_matches',
    );
    new Tooltip(shortenLinkToolTip, {
      container: 'body',
      trigger: 'hover',
      title: t('Hotel.shortLink') || '',
    });
    new Tooltip(copyHotelToolTip, {
      container: 'body',
      trigger: 'hover',
      title: t('Hotel.tooltipCopy') || '',
    });
  };

  useEffect(() => {
    renderTooltip();
  }, [t('Hotel.tooltipCopy')]);

  useEffect(() => {
    setHotels(hotels);
  }, [hotels.length]);

  return (
    <>
      {/* Top SearchBanner */}
      <div className="row y-gap-20 items-center">
        <div className="col-12">
          <div className="row x-gap-20 y-gap-10 items-center">
            <div className="col-auto">
              <div className="text-18 fw-500">{t('FilterBar.filter')}</div>
            </div>
            {/* End .col-auto */}

            <div className="col-10">
              <div className="row x-gap-15 y-gap-15">
                <div className="col-auto d-flex align-items-center">
                  <button
                    onClick={resetFilter}
                    className="button -dark-1 bg-blue-1 text-white text-14 rounded-100 px-15 h-34"
                  >
                    <i className="bi bi-arrow-clockwise mr-1">
                      {t('FilterBar.reset')}
                    </i>
                  </button>
                </div>
                <DropdownSelectStar
                  priceFilter={priceFilter}
                  setPriceFilter={setPriceFilter}
                  ratingFilter={ratingFilter}
                  setRatingFilter={handleRatingFilterChange}
                  starFilter={starFilter}
                  setStarFilter={handleStarFilterChange}
                  distanceSortOrder={distanceSortOrder}
                  setDistanceSortOrder={setDistanceSortOrder}
                />
              </div>
            </div>
            {/* End .col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End col-auto */}
        <div className={`col-lg-3 col-md-5 col-sm-6`}>
          <HotelNameFilter
            hotelFilterStore={hotelFilterStore}
            hotelNameFilterStore={hotelNameFilterStore}
            disabled={loading || isExpired}
          />
        </div>
        <div className={`col-6 col-md-8 col-lg-4`}>
          <DistanceFilter
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
          />
        </div>
        <div className="col-auto">
          <button
            onClick={() => {
              setGapActive(!gapActive);
            }}
            className={`button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1 ${
              gapActive && 'active'
            }`}
          >
            <i className="icon-up-down text-14 mr-10"></i>
            {t('FilterBar.bHotelGap')}
          </button>
        </div>
        {/* End col-auto */}
        <HotelTabs />

        <div className="row y-gap-30 sm:pr-0">
          <ResultHeader
            loading={loading}
            isExpired={isExpired}
            totalResult={totalFilter}
          />
          {!isExpired && <HotelProperties hotels={data} />}
        </div>
        {/* End .row */}
        <Pagination
          filterTotalResult={totalFilter}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {/* End .row */}
    </>
  );
}
