import { destinationAutoTyping } from "@/utils/destinationAutoTyping";
import Image from "next/image";

const Locations = ({ gallery }) => {
 
  const handleCityClick = (city) => {
    if (!city.name) return;
    destinationAutoTyping(city.name);
  };

  return (
    <>
      {gallery.map((item, index) => (
        <div
          className="col-xl-3 col-lg-4 col-md-6"
          key={item?.name}
          data-aos="fade"
          data-aos-delay={100}
        >
          <button
            onClick={() => handleCityClick(item)}
            className="destCard -type-1 d-block"
          >
            <div className="row x-gap-10 y-gap-10 items-center">
              <div className="col-auto">
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
                  className="text-start fs-6 fw-500 text-wrap"
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
