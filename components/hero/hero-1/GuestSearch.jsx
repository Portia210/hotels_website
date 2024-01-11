"use client";

import { ADULTS, CHILDRENS, DECREMENT, INCREMENT } from "@/constants/searchBar";
import useSearchStore from "@/store/useSearchStore";
import { convertRoomInfo, parseGuestInfo } from "@/utils/convertRoomInfo";
import cloneDeep from "lodash/cloneDeep";
import { useEffect, useState } from "react";
import RoomInfo from "./RoomInfo";
import { usePathname } from "next/navigation";

const GuestSearch = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
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
      } else if (action === DECREMENT) {
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

  const updateSearchInput = () => {
    let searchInput = searchStore?.searchInput;
    const childrenAges = rooms
      .map((room) => room.childrens)
      .flat()
      .map((age) => Number(age));
    const guests = convertRoomInfo(rooms);
    searchInput = {
      ...searchInput,
      rooms: rooms.length,
      adults: guestCounts.Adults,
      children: guestCounts.Children,
      childrenAges,
      guests,
    };
    searchStore.setSearchInput(searchInput);
  };

  const handleAddRoom = () => {
    if (rooms.length > 3) return;
    setRooms((prev) => [...prev, { adults: 1, childrens: [] }]);
  };

  const handleDeleteRoom = (index) => {
    setRooms((prev) => {
      const cloneRooms = cloneDeep(prev);
      cloneRooms.splice(index, 1);
      return cloneRooms;
    });
  };

  const loadRoomInfo = () => {
    if (pathName !== "/hotel-list") return;
    const params = new URLSearchParams(window.location.search);
    const guests = params.get("guests");
    const rooms = parseGuestInfo(guests);
    if (rooms) {
      setRooms(rooms);
    }
  };

  useEffect(() => {
    caculateGuestCounts();
    updateSearchInput();
  }, [rooms]);

  useEffect(() => {
    loadRoomInfo();
  }, [pathName]);

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
          childrens - <span className="js-count-room">{guestCounts.Rooms}</span>{" "}
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
