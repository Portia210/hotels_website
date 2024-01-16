import { parseGuestInfo } from "./convertRoomInfo";

const loadLocation = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("destination")) {
    const destination = JSON.parse(params.get("destination"));
    return destination;
  }
};

const loadDateSearch = () => {
  const params = new URLSearchParams(window.location.search);
  const checkInDate = params.get("checkInDate");
  const checkOutDate = params.get("checkOutDate");
  return {
    checkInDate,
    checkOutDate,
  };
};

const loadRoomInfo = () => {
  const params = new URLSearchParams(window.location.search);
  const guests = params.get("guests");
  return parseGuestInfo(guests);
};

export { loadLocation, loadDateSearch, loadRoomInfo };
