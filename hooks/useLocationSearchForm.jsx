import useSearchStore from "@/store/useSearchStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useLocationSearchForm = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const setLocation = (destination) => {
    setSelectedLocation(destination);
    setLocationInput(destination.destination);
  };

  const updateInputDestination = (destination) => {
    if (!destination?.destination) return;
    let searchInput = searchStore.searchInput;
    searchInput = {
      ...searchInput,
      destination,
    };
    searchStore.setSearchInput(searchInput);
  };

  const loadLocation = async () => {
    if (pathName !== "/hotel-list") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("destination")) {
      const destination = JSON.parse(params.get("destination"));
      setLocation(destination);
      setTimeout(() => {
        updateInputDestination(destination);
      });
      return destination;
    }
  };

  useEffect(() => {
    loadLocation();
  }, [pathName]);


  useEffect(() => {
    if (!locationInput) {
      searchStore.setSearchInput({
        ...searchStore.searchInput,
        destination: null,
      });
    }
  }, [locationInput]);
  
  return {
    locationInput,
    selectedLocation,
    searchInputValidation: searchStore.searchInputValidation,
    setLocation,
    setLocationInput,
    updateInputDestination,
  };
};
export default useLocationSearchForm;
