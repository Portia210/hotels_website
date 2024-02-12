import useSearchStore from "@/store/useSearchStore";
import { destinationAutoTyping } from "@/utils/destinationAutoTyping";
import Image from "next/image";

const Locations = ({ isReverse, gallery }) => {
  const { setDestination, setLocationInput } = useSearchStore();
  const handleCityClick = (city) => {
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

  return (
    <>
      {gallery.map((item) => (
        <div
          className={`col-xl-3 col-lg-4 col-md-6 d-flex ${
            isReverse && "justify-content-end"
          }`}
          key={item?.name}
          data-aos="fade"
          data-aos-delay={100}
        >
          <button
            onClick={() => handleCityClick(item)}
            className="destCard -type-1 d-block"
          >
            <div className="row x-gap-10 y-gap-10 items-center">
              <div className={`col-auto ${isReverse && "order-1"}`}>
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
                  className={`fs-6 fw-500 text-wrap ${
                    isReverse ? "text-end" : "text-start"
                  }`}
                  style={{ width: "100px" }}
                >
                  {item?.name}
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
