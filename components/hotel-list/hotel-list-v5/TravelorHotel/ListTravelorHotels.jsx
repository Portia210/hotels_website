'use client';
import DropdownSelectStar from '@/components/hotel-list/common/DropdownSelectStar';
import Pagination from '@/components/hotel-list/common/Pagination';
import useTrans from '@/hooks/useTrans';
import useTravelorHotelList from '@/hooks/useTravelorHotelList';
import useTravelorFilterBar from '@/hooks/useTravelorFilterBar';
import useTravelorHotelFilterStore from '@/store/useTravelorHotelFilterStore';
import HotelNameFilter from '../HotelNameFilter';
import HotelTabs from '../HotelTabs';
import ResultHeader from '../ResultHeader';
import TravelorHotelProperties from './TravelorHotelProperties';
import { useEffect } from 'react';

export default function ListTravelorHotels() {
  const { t, isReverse } = useTrans();
  const { gapActive, setGapActive, setHotels } = useTravelorHotelFilterStore();
  const { hotels, loading, isExpired } = useTravelorHotelList();

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
    resetFilter,
  } = useTravelorFilterBar(hotels);

  const renderTooltip = () => {
    if (!t('Hotel.tooltipCopy')) return;
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const copyHotelToolTip = document.getElementById('copyHotelInfoTooltip');
    const shortenLinkToolTip = document.getElementById('shortenLinkTooltip');
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
        <div className="col-auto">
          <div className="row x-gap-20 y-gap-10 items-center">
            <div className="col-auto">
              <div className="text-18 fw-500">{t('FilterBar.filter')}</div>
            </div>
            {/* End .col-auto */}

            <div className="col-auto">
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
                />
              </div>
            </div>
            {/* End .col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End col-auto */}

        <div className={`col-lg-${isReverse ? '3' : '4'} col-md-5 col-sm-6`}>
          <HotelNameFilter disabled={loading || isExpired} />
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
          {!isExpired && <TravelorHotelProperties hotels={data} />}
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