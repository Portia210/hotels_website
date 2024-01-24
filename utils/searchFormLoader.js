import Cookies from "js-cookie";
import { parseGuestInfo } from "./convertRoomInfo";

const loadLocation = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("destination")) {
    const destination = JSON.parse(params.get("destination"));
    return destination;
  }
};

const loadDateSearch = (pathName) => {
  let checkInDate = null;
  let checkOutDate = null;
  if (pathName.includes("/hotel-list")) {
    const params = new URLSearchParams(window.location.search);
    checkInDate = params.get("checkInDate");
    checkOutDate = params.get("checkOutDate");
  } else if (pathName === "/") {
    const searchInput = JSON.parse(Cookies.get("searchInput") || "{}");
    if (searchInput) {
      checkInDate = searchInput.checkInDate;
      checkOutDate = searchInput.checkOutDate;
    }
  }

  return {
    checkInDate,
    checkOutDate,
  };
};

const loadRoomInfo = (pathName) => {
  let guests = "";
  if (pathName === "/hotel-list") {
    const params = new URLSearchParams(window.location.search);
    guests = params.get("guests");
  } else if (pathName === "/") {
    const searchInput = JSON.parse(Cookies.get("searchInput") || "{}");
    if (searchInput) guests = searchInput.guests;
  }
  return parseGuestInfo(guests);
};

export { loadLocation, loadDateSearch, loadRoomInfo };
