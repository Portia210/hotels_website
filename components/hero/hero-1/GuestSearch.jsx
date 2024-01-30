"use client";

import useGuestSearchForm from "@/hooks/useGuestSearchForm";
import useTransStore from "@/store/useTransStore";
import { useLocale } from "next-intl";
import RoomInfo from "./RoomInfo";

const GuestSearch = () => {
  const locale = useLocale();
  const messages = useTransStore((state) => state.messages);
  const searchBoxTrans = messages?.SearchBox;

  const {
    rooms,
    guestCounts,
    handleRoomInfoChange,
    handleChildAgeChange,
    handleAddRoom,
    handleDeleteRoom,
  } = useGuestSearchForm();

  const renderText = (key, value) => {
    if (key === "Adults") {
      if (value <= 1) return `${value} ${searchBoxTrans?.adult}`;
      return `${value} ${searchBoxTrans?.adults}`;
    } else if (key === "Childrens") {
      if (value == 1) return `${value} ${searchBoxTrans?.child}`;
      return `${value} ${searchBoxTrans?.childrens}`;
    } else if (key === "Rooms") {
      if (value <= 1) return `${value} ${searchBoxTrans?.room}`;
      return `${value} ${searchBoxTrans?.rooms}`;
    }
  };

  const isReverse = (val) => {
    if (locale === "he" && val > 1) return "rtl";
    return "ltr";
  };

  return (
    <div className="searchMenu-guests px-20 lg:py-20 lg:px-0 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">{searchBoxTrans?.guests}</h4>
        <div className="d-flex text-15 text-light-1 ls-2 lh-16">
          <p
            className="js-count-adult me-1"
            dir={isReverse(guestCounts.Adults)}
          >
            {renderText("Adults", guestCounts.Adults)}
          </p>
          <span className="text-light-1 me-1"> - </span>
          {guestCounts.Children > 0 && (
            <>
              <p
                className="js-count-child me-1"
                dir={isReverse(guestCounts.Children)}
              >
                {renderText("Childrens", guestCounts.Children)}
              </p>
              <span className="text-light-1 me-1"> - </span>
            </>
          )}
          <p className="js-count-room" dir={isReverse(guestCounts.Rooms)}>
            {renderText("Rooms", guestCounts.Rooms)}
          </p>
        </div>
      </div>
      {/* End guest */}

      <div
        className="shadow-2 dropdown-menu min-width-400"
        style={{ height: "fit-content" }}
      >
        <div className="bg-white px-30 py-10 rounded-4 counter-box">
          {rooms.map((room, index) => {
            return (
              <div key={index}>
                <div className="d-flex justify-between items-center text-14 lh-12 text-light-1">
                  <div>
                    {searchBoxTrans?.room} {index + 1}
                  </div>
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
