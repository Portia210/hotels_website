import useHotelInfoToast from "@/hooks/useHotelInfoToast";
import useSearchStore from "@/store/useSearchStore";
import useTransStore from "@/store/useTransStore";
import HotelStars from "./HotelStars";
import { useEffect, useState } from "react";
import { renderGuestText } from "@/utils/convertRoomInfo";

export default function HotelInfoToast({ hotel, price, locale }) {
  const isReverse = locale === "he";
  const messages = useTransStore((state) => state.messages);
  const searchBox = messages?.SearchBox;
  const hotelTrans = messages?.Hotel;
  const searchInput = useSearchStore((state) => state.searchInput);
  const [shortLink, setShortLink] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const { hideToast, dateFormat, shortenLink, onCopyInfo } =
    useHotelInfoToast(isReverse);

  const hideToolTip = (elementId) => {
    if (!elementId) throw Error("hideToolTip elementId is required");
    const Tooltip = require("bootstrap/js/dist/tooltip");
    const toolTipElement = document.getElementById(elementId);
    const element = Tooltip.getInstance(toolTipElement);
    element.hide();
  };

  const handleShortenLink = async (hotel) => {
    if (shortLink) return;
    const link = await shortenLink(hotel.travelorLink);
    setShortLink(link);
    hideToolTip("shortenLinkTooltip");
  };

  const handleCopyText = () => {
    onCopyInfo(hotel, price, searchInput, hotelTrans, searchBox, shortLink);
    setIsCopied(true);
  };

  useEffect(() => {
    if (hotel?.travelorLink) {
      setShortLink(null);
      setIsCopied(false);
    }
  }, [hotel?.travelorLink]);

  useEffect(() => {
    setIsCopied(false);
  }, [shortLink]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(()=>{
        hideToolTip("copyHotelInfoTooltip");
      }, 500)
    }
  }, [isCopied]);

  return (
    <>
      <div
        className="toast-container position-fixed bottom-0 start-0 p-3 w-fit"
        style={{ zIndex: 20, width: "fit-content", minHeight: 250 }}
      >
        <div
          id="liveToast"
          className="toast hide bg-white"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">{hotel?.title}</strong>
            <button
              id="shortenLinkTooltip"
              onClick={() => handleShortenLink(hotel)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              className={`button -blue-1 bg-white size-30 rounded-full shadow-2 me-2 ${
                shortLink && "active"
              }`}
            >
              <i className="bi bi-link-45deg"></i>
            </button>
            <button
              id="copyHotelInfoTooltip"
              onClick={handleCopyText}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              className={`button -blue-1 bg-white size-30 rounded-full shadow-2 ${
                isCopied && "active"
              }`}
            >
              <i className="bi bi-clipboard"></i>
            </button>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={hideToast}
            ></button>
          </div>
          <div
            className={`toast-body d-flex flex-column ${
              isReverse ? "align-items-end" : ""
            }`}
          >
            <p>
              {searchBox?.dates}: {dateFormat(searchInput)}
            </p>
            <div
              className={`d-flex text-14 text-light-1 ${
                isReverse ? "flex-row-reverse justify-content-end" : ""
              }`}
            >
              <p>{hotelTrans?.guestReviews}</p>
              <span
                className={`flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white ${
                  isReverse ? "mr-10" : "ml-10"
                }`}
              >
                {hotel?.rate}
              </span>
            </div>
            <HotelStars stars={hotel?.stars} />
            <p>
              {renderGuestText(searchBox, "Adults", searchInput?.adults)}{" "}
              {renderGuestText(searchBox, "Childrens", searchInput?.childrens)}
            </p>
            <div className="d-flex x-gap-5 align-items-center">
              <p>{hotelTrans?.price}:</p>
              <p>{price}</p>
            </div>
            {shortLink && (
              <div className="d-flex x-gap-5 align-items-center">
                <p>{hotelTrans?.link}</p>
                <a href={shortLink} target="_blank">
                  <p className="text-primary">{shortLink}</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
