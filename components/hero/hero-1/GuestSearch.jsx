"use client";

import cloneDeep from "lodash/cloneDeep";
import { useEffect, useState } from "react";
import ChildAgeDropDown from "./ChildAgeDropdown";

const ADULTS = "Adults";
const CHILDRENS = "Childrens";
const INCREMENT = "Increment";
const DECREMENT = "Decrement";

const RoomInfo = ({ room, index, onChange, onChildAgeChange }) => {
  const incrementCount = (name) => {
    if (name === CHILDRENS) {
      onChange(INCREMENT, name, room.childrens, index);
      return;
    }
    onChange(INCREMENT, name, room.adults + 1, index);
  };

  const decrementCount = (name) => {
    if (name === CHILDRENS) {
      onChange(DECREMENT, name, room.childrens.length - 1, index);
      return;
    }
    onChange(DECREMENT, name, room.adults - 1, index);
  };

  const handleChildAgeChange = (value, childIndex) => {
    onChildAgeChange(value, index, childIndex);
  };

  return (
    <div className="row">
      {[ADULTS, CHILDRENS].map((name) => {
        return (
          <div key={name} className="row col-6">
            <div className="row col-auto y-gap-5 mt-1">
              <div className="col-auto">
                <div className="text-15 lh-12 fw-500">{name}</div>
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
                      {name === CHILDRENS
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
          </div>
        );
      })}
      <div className="row gy-1">
        <>
          {room?.childrens?.length > 0 && (
            <label htmlFor="childAge">Child Ages</label>
          )}
          {room?.childrens?.map((childAge, childIndex) => {
            return (
              <div className="col-3">
                <ChildAgeDropDown
                  index={childIndex}
                  key={childIndex}
                  value={childAge}
                  onSelect={(value) => {
                    handleChildAgeChange(value, childIndex);
                  }}
                />
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
};

const GuestSearch = () => {
  const [rooms, setRooms] = useState([{ adults: 1, childrens: [] }]);

  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 1,
    Rooms: 1,
  });

  const handleRoomInfoChange = (action, name, value, index) => {
    if (name === CHILDRENS) {
      if (action === INCREMENT) {
        setRooms((prev) => {
          const cloneRooms = cloneDeep(prev);
          const room = cloneRooms[index];
          room.childrens.push(10);
          cloneRooms[index] = room;
          return cloneRooms;
        });
      } else {
        setRooms((prev) => {
          const cloneRooms = cloneDeep(prev);
          const room = cloneRooms[index];
          room.childrens.pop();
          cloneRooms[index] = room;
          return cloneRooms;
        });
      }
    } else if (name === ADULTS) {
      const newRooms = [...rooms];
      newRooms[index].adults = value;
      setRooms(newRooms);
    }
  };

  const handleChildAgeChange = (value, roomIndex, childIndex) => {
    setRooms((prev) => {
      const cloneRooms = cloneDeep(prev);
      const room = cloneRooms[roomIndex];
      room.childrens[childIndex] = value;
      cloneRooms[roomIndex] = room;
      return cloneRooms;
    });
  };

  const caculateGuestCounts = () => {
    const Adults = rooms.reduce((acc, room) => acc + room.adults, 0);
    const Children = rooms.reduce(
      (acc, room) => acc + room.childrens.length,
      0
    );
    const Rooms = rooms.length;
    setGuestCounts({ Adults, Children, Rooms });
  };

  useEffect(() => {
    caculateGuestCounts();
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
        <div className="bg-white px-30 py-10 rounded-4 counter-box">
          {rooms.map((room, index) => {
            return (
              <div key={index}>
                <div className="d-flex justify-between items-center text-14 lh-12 text-light-1">
                  <div>Room {index + 1}</div>
                  {index > 0 && (
                    <div
                      onClick={() => handleDeleteRoom(index)}
                      className="cursor-pointer text-red-1"
                    >
                      Remove
                    </div>
                  )}
                </div>
                <RoomInfo
                  room={room}
                  index={index}
                  onChange={(action, name, value, index) =>
                    handleRoomInfoChange(action, name, value, index)
                  }
                  onChildAgeChange={(value, index, childIndex) =>
                    handleChildAgeChange(value, index, childIndex)
                  }
                />
                <div className="border-top-light mt-24 mb-10" />
              </div>
            );
          })}
        </div>
        <div
          onClick={handleAddRoom}
          className="addRoom-btn button w-full d-flex justify-center items-center -outline-blue-1 m-4 mt-0"
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
