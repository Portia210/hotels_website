"use client";

import useGuestSearchForm from "@/hooks/useGuestSearchForm";
import RoomInfo from "./RoomInfo";

const GuestSearch = () => {
  const {
    rooms,
    guestCounts,
    handleRoomInfoChange,
    handleChildAgeChange,
    handleAddRoom,
    handleDeleteRoom,
  } = useGuestSearchForm();

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
                  totalChild={guestCounts.Children}
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
