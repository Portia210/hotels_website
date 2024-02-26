import useSearchStore from '@/store/useSearchStore';
import { destinationAutoTyping } from '@/utils/destinationAutoTyping';
import Image from 'next/image';
import useDestinationGalleryStore from '@/store/useDestinationGalleryStore';
import useTrans from '@/hooks/useTrans';

const Locations = ({ isReverse, gallery, showSites }) => {
  const { t } = useTrans();
  const { selectedCountry, setSelectedCity } = useDestinationGalleryStore();
  const { setDestination, setLocationInput } = useSearchStore();
  const handleCityClick = city => {
    if (!city.name) return;
    destinationAutoTyping(city.name);
    setLocationInput(city.name);
    const { placeId, name: destination, geoLocation } = city;
    setDestination({
      placeId,
      destination,
      lat: geoLocation.lat,
      lng: geoLocation.lng,
    });
  };

  const googleSearch = city => {
    const url = `https://www.google.com/search?q=${city.name}, ${selectedCountry.label}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {gallery.map(item => (
        <div
          className={`col-xl-3 col-lg-4 col-md-6 d-flex ${
            isReverse && 'justify-content-end'
          }`}
          key={item?.name}
          data-aos="fade"
          data-aos-delay={100}
        >
          <button className="destCard -type-1 d-block">
            <div className="row x-gap-15 y-gap-10 items-center">
              <div
                onClick={() => handleCityClick(item)}
                className={`col-auto ${isReverse && 'order-1'}`}
              >
                <div className="destCard__image rounded-4">
                  <Image
                    className="size-100 rounded-4"
                    src={item?.image[0]}
                    alt="image"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className="col-auto">
                <div
                  className={`fs-6 fw-500 text-wrap text-truncate ${
                    isReverse ? 'text-end' : 'text-start'
                  }`}
                  dir={isReverse ? 'rtl' : 'ltr'}
                  style={{ width: '130px' }}
                >
                  <span class="limited-lines">{item?.name}</span>
                  <div
                    className={`cursor-pointer d-flex flex-row x-gap-15 mt-10 text-nowrap`}
                  >
                    {showSites && (
                      <i
                        onClick={() => setSelectedCity(item)}
                        className="text-primary bi bi-geo-alt"
                        dir={isReverse ? 'rtl' : 'ltr'}
                      >
                        {' '}
                        <label className="cursor-pointer text-dark">
                          {t('DestinationWeLove.sites')}
                        </label>
                      </i>
                    )}

                    <i
                      onClick={() => googleSearch(item)}
                      className="text-primary bi bi-info-circle"
                      dir={isReverse ? 'rtl' : 'ltr'}
                    >
                      {' '}
                      <label className="cursor-pointer text-dark">
                        {t('DestinationWeLove.info')}
                      </label>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      ))}
    </>
  );
};

export default Locations;
