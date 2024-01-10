"use client";

import cloneDeep from "lodash/cloneDeep";
import { useEffect, useState } from "react";

const ADULTS = "Adults";
const CHILDRENS = "Children";

const roomProperties = [ADULTS, CHILDRENS];

const RoomInfo = ({ room, index, onChange }) => {
  const incrementCount = (name) => {
    console.log("incrementCount", name);
    if (name === CHILDRENS) {
      onChange(name, room.childrens, index);
      return;
    }
    onChange(name, room.adults + 1, index);
  };
  const decrementCount = (name) => {
    console.log("decrementCount", name);
    if (name === CHILDRENS) {
      onChange(name, room.childrens.length - 1, index);
      return;
    }
    onChange(name, roomadults - 1, index);
  };

  return (
    <>
      {roomProperties.map((name, index) => {
        return (
          <div
            key={index}
            className="row y-gap-10 justify-between items-center mt-1"
          >
            <div className="col-auto">
              <div className="text-15 lh-12 fw-500">{name}</div>
              {name === "Children" && (
                <div className="text-14 lh-12 text-light-1 mt-5">
                  Ages 0 - 17
                </div>
              )}
            </div>
            {/* End .col-auto */}
            <div className="col-auto">
              <div className="d-flex items-center js-counter">
                <button
                  className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
                  onClick={() => decrementCount(name)}
                >
                  <i className="icon-minus text-12" />
                </button>
                {/* decrement button */}
                <div className="flex-center size-20 ml-15 mr-15">
                  <div className="text-15 js-count">
                    {name === "Children"
                      ? room?.childrens?.length || 0
                      : room.adults}
                  </div>
                </div>
                {/* counter text  */}
                <button
                  className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
                  onClick={() => incrementCount(name)}
                >
                  <i className="icon-plus text-12" />
                </button>
                {/* increment button */}
              </div>
            </div>
            {/* End .col-auto */}
          </div>
        );
      })}
    </>
  );
};

const GuestSearch = () => {
  const [rooms, setRooms] = useState([{ adults: 1, childrens: [] }]);

  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 1,
    Rooms: 1,
  });

  const handleRoomInfoChange = (name, value, index) => {
    console.log("handleCounterChange", name, value, index);
    if (name === CHILDRENS) {
      setRooms((prev) => {
        const cloneRooms = cloneDeep(prev);
        const room = cloneRooms[index];
        room.childrens.push(10);
        cloneRooms[index] = room;
        return cloneRooms;
      });
    } else {
      const newRooms = [...rooms];
      newRooms[index].adults = value;
      setRooms(newRooms);
    }
  };

  useEffect(() => {
    console.log("rooms", rooms);
  }, [rooms]);

  const handleAddRoom = () => {
    setRooms((prev) => [...prev, { adults: 1, childrens: [] }]);
  };

  const handleDeleteRoom = (index) => {
    setRooms((prev) => {
      const cloneRooms = cloneDeep(prev);
      cloneRooms.splice(index, 1);
      return cloneRooms;
    });
  };

  return (
    <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Guest</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{guestCounts.Adults}</span> adults -{" "}
          <span className="js-count-child">{guestCounts.Children}</span>{" "}
          childeren - <span className="js-count-room">{guestCounts.Rooms}</span>{" "}
          room
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {rooms.map((room, index) => {
            return (
              <div key={index}>
                {index > 0 && (
                  <div className="d-flex justify-between items-center text-14 lh-12 text-light-1">
                    <div>Room {index + 1}</div>
                    <div
                      onClick={() => handleDeleteRoom(index)}
                      className="cursor-pointer text-red-1"
                    >
                      Remove
                    </div>
                  </div>
                )}
                <RoomInfo
                  room={room}
                  index={index}
                  onChange={(name, value, index) =>
                    handleRoomInfoChange(name, value, index)
                  }
                />
                <div className="border-top-light mt-24 mb-24" />
              </div>
            );
          })}
        </div>
        <div
          onClick={handleAddRoom}
          className="addRoom-btn button w-full d-flex justify-center items-center -outline-blue-1"
        >
          <div className="text-15 lh-12 fw-500 text-blue-1">Add Room</div>
          <button className="button text-blue-1 size-38 rounded-4 ">
            <i className="icon-plus text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default GuestSearch;
