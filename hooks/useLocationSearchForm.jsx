import useSearchStore from "@/store/useSearchStore";
import { loadLocation } from "@/utils/searchFormLoader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useLocationSearchForm = () => {
  const pathName = usePathname();
  const {
    destination,
    setDestination,
    searchInputValidation,
    locationInput,
    setLocationInput,
  } = useSearchStore();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const setLocation = (destination) => {
    setSelectedLocation(destination);
    setLocationInput(destination.destination);
  };

  const handleSelectLocation = (destination) => {
    setLocation(destination);
    setDestination(destination);
  };

  const onLoadLocation = async () => {
    if (!pathName.includes("/hotel-list")) return;
    const destination = loadLocation();
    handleSelectLocation(destination);
  };

  useEffect(() => {
    onLoadLocation();
  }, [pathName]);

  useEffect(() => {
    // if (!locationInput) setDestination(null);
  }, [locationInput]);

  return {
    locationInput,
    selectedLocation,
    searchInputValidation,
    setLocationInput,
    handleSelectLocation,
  };
};
export default useLocationSearchForm;
