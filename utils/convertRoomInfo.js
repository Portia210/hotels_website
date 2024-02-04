/**
 * Convert room's info to guests (Travelor)
 * @param rooms
 * @returns  {string} guests
 */
const convertRoomInfo = (rooms) => {
  const result = [];

  rooms.forEach((room) => {
    const { adults, childrens } = room;
    let adult = "";
    for (let i = 0; i < adults; i++) {
      adult += "a,";
    }
    let child = "";
    for (let i = 0; i < childrens.length; i++) {
      child += `${childrens[i]},`;
    }
    let roomInfo = `${adult}${child}`;
    if (roomInfo.endsWith(",")) roomInfo = roomInfo.slice(0, -1);
    result.push(roomInfo);
  });

  return `${result.join("|")}`;
};

/**
 * parse guest's info to rooms (Travelor)
 * example: "a,a,a|a, 1, 2" => [{adults: 3, childrens: []}, {adults: 1, childrens: [1, 2]}]
 */
const parseGuestInfo = (guest) => {
  if (!guest) return null;
  const result = [];
  const guests = guest.split("|");
  guests.forEach((guest) => {
    const room = guest.split(",");
    const adults = room.filter((item) => item === "a").length;
    const childrens = room
      .filter((item) => item !== "a")
      .map((item) => Number(item));
    result.push({ adults, childrens });
  });
  return result;
};

const renderGuestText = (searchBoxTrans, key, value) => {
  if (key === "Adults") {
    if (value <= 1) return `${value} ${searchBoxTrans?.adult}`;
    return `${value} ${searchBoxTrans?.adults}`;
  } else if (key === "Childrens") {
    if (!value || value === 0) return "";
    if (value == 1) return `${value} ${searchBoxTrans?.child}`;
    return `${value} ${searchBoxTrans?.childrens}`;
  } else if (key === "Rooms") {
    if (value <= 1) return `${value} ${searchBoxTrans?.room}`;
    return `${value} ${searchBoxTrans?.rooms}`;
  }
};

export { convertRoomInfo, parseGuestInfo, renderGuestText };
