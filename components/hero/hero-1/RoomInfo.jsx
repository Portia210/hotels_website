import ChildAgeDropDown from "./ChildAgeDropdown";
import { ADULTS, CHILDRENS, INCREMENT, DECREMENT } from "@/constants/searchBar";

const RoomInfo = ({ room, index, onChange, onChildAgeChange }) => {
  const incrementCount = (name) => {
    if (name === CHILDRENS) {
      if (room.childrens.length > 9) return;
      onChange(INCREMENT, name, room.childrens, index);
      return;
    }
    if (room.adults > 5) return;
    onChange(INCREMENT, name, room.adults + 1, index);
  };

  const decrementCount = (name) => {
    if (name === CHILDRENS) {
      onChange(DECREMENT, name, room.childrens.length - 1, index);
      return;
    }
    if (room.adults === 1) return;
    onChange(DECREMENT, name, room.adults - 1, index);
  };

  const handleChildAgeChange = (value, childIndex) => {
    onChildAgeChange(value, index, childIndex);
  };

  return (
    <div className="row" key={index}>
      {[ADULTS, CHILDRENS].map((name, index) => {
        return (
          <div key={index} className="row col-6">
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
              <div className="col-3" key={childIndex}>
                <ChildAgeDropDown
                  index={childIndex}
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
export default RoomInfo;
