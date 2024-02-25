'use client';
import useDestinationGallery from '@/hooks/useDestinationGallery';
import useDestinationGalleryStore from '@/store/useDestinationGalleryStore';
import { useEffect, useState } from 'react';
import Locations from './Locations';
import useTrans from '@/hooks/useTrans';

export default function DestinationGallery() {
  const { t, isReverse } = useTrans();
  const [maxResult, setMaxResult] = useState(8);
  const [showTouristAttractions, setShowTouristAttractions] = useState(false);
  const {
    selectedCountry,
    destinationGallery,
    setDestinationGallery,
    touristAttractionsGallery,
    setTouristAttractionsGallery,
  } = useDestinationGalleryStore();

  const { fetchCountryCities, loading } = useDestinationGallery();

  const getCountryCities = async country => {
    const response = await fetchCountryCities(country.label);
    const cities = Array.from(
      new Set(response.results.map(city => city.name)),
    ).map(name => response.results.find(city => city.name === name));

    setDestinationGallery(cities);
  };

  const handleLoadMore = () => {
    if (destinationGallery.length > 0) {
      setMaxResult(prev => {
        if (prev < destinationGallery.length) {
          return destinationGallery.length;
        } else if (prev === destinationGallery.length) {
          return 8;
        }
        return prev;
      });
    }
  };

  const onShowTouristAttractions = city => {
    console.log(city);
    setShowTouristAttractions(true);
  };

  useEffect(() => {
    if (selectedCountry) {
      getCountryCities(selectedCountry);
      setMaxResult(8);
    }
  }, [selectedCountry]);

  return (
    <section
      className="layout-pb-md"
      id="cityGallery"
      style={{
        scrollMarginTop: '180px',
      }}
    >
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className={`col-auto ${isReverse && 'order-1'}`}>
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">
                {selectedCountry?.label &&
                  `${t('DestinationWeLove.citiesIn')}${selectedCountry?.label}`}
              </h2>
            </div>
          </div>
          {/* End .col */}

          <div className="col-auto">
            {loading ? (
              <div className="d-flex align-items-center x-gap-10">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              destinationGallery.length > 8 && (
                <button
                  onClick={handleLoadMore}
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  {maxResult === 8
                    ? `${t('DestinationWeLove.more')}`
                    : `${t('DestinationWeLove.less')}`}
                  <i
                    className={`bi bi-arrow-${
                      maxResult === 8 ? 'down' : 'up'
                    } ml-10`}
                  ></i>
                </button>
              )
            )}
          </div>
        </div>
        {/* End .row */}

        <div
          className={`row y-gap-30 pt-20 sm:pt-20 ${
            isReverse && 'flex-row-reverse'
          }`}
        >
          <Locations
            isReverse={isReverse}
            gallery={destinationGallery?.slice(0, maxResult)}
            showTouristAttractions={onShowTouristAttractions}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
