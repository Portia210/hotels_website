"use client";

import useCurrencyStore from "@/store/useCurrencyStore";
import { convertCurrency } from "@/utils/currencyConverter";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const itemSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const HotelProperties = ({ hotels, loading }) => {
  const { currency } = useCurrencyStore();

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

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {!loading && hotels?.length === 0 && <h3>No hotels found</h3>}
      {hotels.map((item, index) => (
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
                  <div className="cardImage">
                    <div className="cardImage__content_3-2">
                      <Image
                        width={600}
                        height={400}
                        className="rounded-4 col-12 js-lazy"
                        src={item?.picture_link || "/img/hotels/1.png"}
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
              </div>
            </div>
            <div className="hotelsCard__content mt-10">
              <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{item?.title}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
                {item?.distance}
              </p>
              <div className="d-flex items-center mt-20">
                <div className="d-flex justify-between align-items-center w-100">
                  <div className="d-flex text-14 text-light-1">
                    <p>guest reviews</p>
                    <span className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white ml-10">
                      {item?.rate}
                    </span>
                  </div>
                  <div className="flex-center">
                    {!item?.stars || item?.stars === 0 ? (
                      <i className="bi bi-hand-thumbs-up"></i>
                    ) : (
                      Array.from(Array(item?.stars).keys()).map((_, index) => (
                        <i
                          className="icon-star text-16 text-warning"
                          key={index}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="d-flex justify-between fw-500">
                  <span className="">
                    {convertCurrency(item?.travelorPrice, currency)}
                  </span>
                  <span className="text-blue-1">
                    <Link target="_blank" href={item.travelorLink}>
                      To Travelor
                    </Link>
                  </span>
                </div>
                <div className="d-flex justify-between fw-500">
                  <span className="">
                    {convertCurrency(item?.bookingPrice, currency)}
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
