'use client';
import useDestinationGallery from '@/hooks/useDestinationGallery';
import useDestinationGalleryStore from '@/store/useDestinationGalleryStore';
import { useEffect, useState } from 'react';
import Locations from './Locations';
import useTrans from '@/hooks/useTrans';

export default function TouristAttractionGallery() {
  const { t, isReverse } = useTrans();
  const [maxResult, setMaxResult] = useState(8);
  const {
    selectedCity,
    touristAttractionsGallery,
    setTouristAttractionsGallery,
  } = useDestinationGalleryStore();

  const { fetchTouristAttractions, loading } = useDestinationGallery();

  const getTouristAttractions = async city => {
    console.log('city -->', city);
    const response = await fetchTouristAttractions(city.name);
    const places = Array.from(
      new Set(response.results.map(places => places.name)),
    ).map(name => response.results.find(places => places.name === name));

    setTouristAttractionsGallery(places);
  };

  const handleLoadMore = () => {
    if (touristAttractionsGallery.length > 0) {
      setMaxResult(prev => {
        if (prev < touristAttractionsGallery.length) {
          return touristAttractionsGallery.length;
        } else if (prev === touristAttractionsGallery.length) {
          return 8;
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    if (selectedCity) {
      getTouristAttractions(selectedCity);
      setMaxResult(8);
    }
  }, [selectedCity]);

  if (!selectedCity) return null;

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
                {selectedCity?.name &&
                  `${t('DestinationWeLove.touristAttraction')}${selectedCity?.name}`}
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
              touristAttractionsGallery.length > 8 && (
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
            showSites={false}
            gallery={touristAttractionsGallery?.slice(0, maxResult)}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
