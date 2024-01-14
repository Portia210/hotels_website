"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import isTextMatched from "../../../utils/isTextMatched";

const HotelProperties = ({ hotels, loading }) => {
  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // custom navigation
  function ArrowSlick(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  if (loading) {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }
  return (
    <>
      {hotels.slice(0, 12).map((item, index) => (
        <div
          className="col-lg-3 col-sm-6"
          key={index}
          data-aos="fade"
          data-aos-delay={item.delayAnimation}
        >
          <div className="hotelsCard -type-1 hover-inside-slider">
            <div className="hotelsCard__image">
              <div className="cardImage inside-slider">
                <Slider
                  {...itemSettings}
                  arrows={true}
                  nextArrow={<ArrowSlick type="next" />}
                  prevArrow={<ArrowSlick type="prev" />}
                >
                  <div className="cardImage ratio ratio-1:1">
                    <div className="cardImage__content">
                      <Image
                        width={600}
                        height={400}
                        className="rounded-4 col-12 js-lazy"
                        src={item?.picture_link}
                        alt="image"
                      />
                    </div>
                  </div>
                </Slider>

                <div className="cardImage__wishlist">
                  <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                    <i className="icon-heart text-12" />
                  </button>
                </div>

                <div className="cardImage__leftBadge">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                      isTextMatched(item?.tag, "breakfast included")
                        ? "bg-dark-1 text-white"
                        : ""
                    } ${
                      isTextMatched(item?.tag, "best seller")
                        ? "bg-blue-1 text-white"
                        : ""
                    } 
                    } ${
                      isTextMatched(item?.tag, "-25% today")
                        ? "bg-brown-1 text-white"
                        : ""
                    } 
                     ${
                       isTextMatched(item?.tag, "top rated")
                         ? "bg-yellow-1 text-dark-1"
                         : ""
                     }`}
                  >
                    {item?.tag}
                  </div>
                </div>
              </div>
            </div>
            <div className="hotelsCard__content mt-10">
              <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{item?.title}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
                {item?.distance}
              </p>
              <div className="d-flex items-center mt-20 w-full">
                <div className="d-flex justify-between align-items-center w-full ">
                  <div className="flex-center">
                    {Array.from(Array(item?.stars).keys()).map((_, index) => (
                      <i
                        className="icon-star text-16 text-warning"
                        key={index}
                      />
                    ))}
                  </div>
                  <div className="text-14 text-light-1 ml-10">
                    guests review: {item?.rate}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="d-flex justify-between fw-500">
                  <span className="">
                    {item?.travelorPrice} {""}
                    {item.travelorCurrency}
                  </span>
                  <span className="text-blue-1">
                    <Link target="_blank" href={item.travelorLink}>
                      To Travelor
                    </Link>
                  </span>
                </div>
                <div className="d-flex justify-between fw-500">
                  <span className="">
                    {item?.bookingPrice} {item.bookingCurrency}
                  </span>
                  <span className="text-blue-1">
                    <Link target="_blank" href={item.bookingLink}>
                      To Booking
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelProperties;
