import { ADULTS, CHILDRENS, DECREMENT, INCREMENT } from "@/constants/searchBar";
import useSearchStore from "@/store/useSearchStore";
import { convertRoomInfo, parseGuestInfo } from "@/utils/convertRoomInfo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useGuestSearchForm = () => {
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
      adults: rooms.reduce((acc, room) => acc + room.adults, 0),
      childrens: rooms.reduce((acc, room) => acc + room.childrens.length, 0),
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

  return {
    rooms,
    guestCounts,
    setGuestCounts,
    handleRoomInfoChange,
    handleChildAgeChange,
    handleAddRoom,
    handleDeleteRoom,
  };
};

export default useGuestSearchForm;
