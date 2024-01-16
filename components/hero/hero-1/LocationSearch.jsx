"use client";

import { GOOGLE_MAP_API_KEY } from "@/constants/config";
import { useLoadScript } from "@react-google-maps/api";
import PlaceAutocomplete from "./PlaceAutocomplete";
import useLocationSearchForm from "@/hooks/useLocationSearchForm";

const SearchBar = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ["places"],
    region: "US",
  });
  const {
    locationInput,
    selectedLocation,
    searchInputValidation,
    setLocationInput,
    handleSelectLocation,
  } = useLocationSearchForm();

  if (!isLoaded) return null;
  return (
    <>
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        data-bs-offset="0,22"
      >
        <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
          <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              id="destinationInput"
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className={`js-search js-dd-focus form-control ${
                !searchInputValidation.destination ? "is-invalid" : ""
              }`}
              value={locationInput}
              disabled={!isLoaded}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <div className="invalid-feedback">Enter your location</div>
          </div>
        </div>
      </div>
      <PlaceAutocomplete
        input={locationInput}
        selectedItem={selectedLocation}
        onChange={(destination) => handleSelectLocation(destination)}
      />
    </>
  );
};

export default SearchBar;
