import useSearchStore from "@/store/useSearchStore";
import HotelStars from "./HotelStars";

export default function HotelInfoToast({ hotel, price }) {
  const searchInput = useSearchStore((state) => state.searchInput);
  console.log("searchInput", searchInput);
  const hideToast = () => {
    document.getElementById("liveToast")?.classList?.remove("show");
  };

  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 20 }}>
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">{hotel?.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={hideToast}
            ></button>
          </div>
          <div className="toast-body">
            <div className="d-flex text-14 text-light-1">
              <p>guest reviews</p>
              <span className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white ml-10">
                {hotel?.rate}
              </span>
            </div>
            <HotelStars stars={hotel?.stars} />
            <p>
              Number of guests: {searchInput?.adults} adults,{" "}
              {searchInput?.childrens} children
            </p>
            <p>
              Price: {price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
