import useSearchStore from "@/store/useSearchStore";
import HotelStars from "./HotelStars";
import dayjs from "dayjs";
import useTransStore from "@/store/useTransStore";

export default function HotelInfoToast({ hotel, price, isReverse }) {
  const messages = useTransStore((state) => state.messages);
  const searchBox = messages?.SearchBox;
  const hotelTrans = messages?.Hotel;

  const searchInput = useSearchStore((state) => state.searchInput);
  const hideToast = () => {
    document.getElementById("liveToast")?.classList?.remove("show");
  };

  const dateFormat = () => {
    const { checkInDate, checkOutDate } = searchInput;
    const startDay = dayjs(checkInDate);
    const endDay = dayjs(checkOutDate);
    // Check if the start and end dates are in the same month
    const sameMonth = startDay.isSame(endDay, "month");

    // Format the date range accordingly
    if (sameMonth) {
      // Dates are in the same month
      return `${startDay.format("dddd D.M")} - ${endDay.format("dddd D.M")}`;
    } else {
      // Dates span across different months
      return `${startDay.format("dddd D.M")} - ${endDay.format("dddd D.M")}`;
    }
  };

  const onCopyInfo = () => {
    const starIcons = Array.from(Array(hotel?.stars).keys())
      .map(() => "⭐️") // Use a simple star character
      .join(" ");

    const text = `Dates: ${dateFormat()}\nHotel: ${
      hotel?.title
    }\nNumber of guests: ${searchInput?.adults} adults, ${
      searchInput?.childrens
    } children\nPrice: ${price}\nReviews: ${hotel?.rate + " "}${starIcons}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 20 }}>
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
              onClick={() => onCopyInfo(hotel)}
              className="button -blue-1 bg-white size-30 rounded-full shadow-2"
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
          <div className="toast-body">
            <p>
              {searchBox?.dates}: {dateFormat()}
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
              {hotelTrans?.numberOfGuests}: {searchInput?.adults}{" "}
              {searchBox?.adults}, {searchInput?.childrens}{" "}
              {searchBox?.childrens}
            </p>
            <div className="d-flex x-gap-5 align-items-center">
              <p>{hotelTrans?.price}:</p>
              <p>{price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
