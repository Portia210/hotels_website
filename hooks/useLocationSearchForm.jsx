import useSearchStore from "@/store/useSearchStore";
import { loadLocation } from "@/utils/searchFormLoader";
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

  const handleSelectLocation = (destination) => {
    setLocation(destination);
    setTimeout(() => {
      searchStore.setDestination(destination);
    });
  };

  const onLoadLocation = async () => {
    if (pathName !== "/hotel-list") return;
    const destination = loadLocation();
    handleSelectLocation(destination);
  };

  useEffect(() => {
    onLoadLocation();
  }, [pathName]);

  useEffect(() => {
    if (!locationInput) searchStore.setDestination(null);
  }, [locationInput]);

  return {
    locationInput,
    selectedLocation,
    searchInputValidation: searchStore.searchInputValidation,
    setLocationInput,
    handleSelectLocation,
  };
};
export default useLocationSearchForm;
