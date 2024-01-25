"use client";

import useCurrencyStore from "@/store/useCurrencyStore";
import useTransStore from "@/store/useTransStore";
import { convertCurrency } from "@/utils/currencyConverter";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HotelInfoToast from "../common/HotelInfoToast";
import HotelStars from "../common/HotelStars";

const HotelProperties = ({ hotels }) => {
  const messages = useTransStore((state) => state.messages);
  const hotelTrans = messages?.Hotel;
  const locale = useLocale();
  const isReverse = locale === "he";
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { currency } = useCurrencyStore();

  const onShowHotelInfo = (hotelData) => {
    document.getElementById("liveToast")?.classList?.add("show");
    setSelectedHotel(hotelData);
  };

  const renderText = (key, value) => {
    if (key === "distance") {
      value = value.replace("from center", hotelTrans[key]);
    }
    return value;
  };

  return (
    <>
      {hotels.map((item, index) => (
        <div
          className="col-lg-3 col-sm-6 sm:pr-0"
          key={index}
          data-aos="fade"
          data-aos-delay={item.delayAnimation}
        >
          <div className="hotelsCard -type-1 hover-inside-slider">
            <div className="hotelsCard__image">
              <div className="cardImage inside-slider">
                <div className="cardImage">
                  <div className="cardImage__content_3-2">
                    <Image
                      width={600}
                      height={400}
                      className="rounded-4 col-12 js-lazy"
                      src={item?.picture_link || "/img/hotels/1.png"}
                      loading="lazy"
                      alt="image"
                    />
                  </div>
                </div>

                <div className="cardImage__wishlist">
                  <button
                    onClick={() => onShowHotelInfo(item)}
                    className="button -blue-1 bg-white size-30 rounded-full shadow-2"
                  >
                    <i className="bi bi-card-text"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="hotelsCard__content mt-10">
              <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{item?.title}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
                {renderText('distance', item?.distance)}
              </p>
              <div className="d-flex items-center mt-20">
                <div className="d-flex justify-between align-items-center w-100">
                  <div
                    className={`d-flex text-14 text-light-1 ${
                      isReverse ? "flex-row-reverse" : ""
                    }`}
                  >
                    <p>{hotelTrans.guestReviews}</p>
                    <span
                      className={`flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white ${
                        isReverse ? "mr-10" : "ml-10"
                      }`}
                    >
                      {item?.rate}
                    </span>
                  </div>
                  <div className="flex-center">
                    <HotelStars stars={item?.stars} />
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
      <HotelInfoToast
        hotel={selectedHotel}
        price={convertCurrency(selectedHotel?.travelorPrice, currency)}
        locale={locale}
      />
    </>
  );
};

export default HotelProperties;
