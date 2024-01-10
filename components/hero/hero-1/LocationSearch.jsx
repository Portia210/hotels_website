"use client";

import { GOOGLE_MAP_API_KEY } from "@/constants/config";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";

const SearchBar = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ["places"],
    region: "US",
  });

  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOptionClick = async (item) => {
    setSelectedItem(item);
    setSearchValue(item.destination);
  };

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
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus"
              value={searchValue}
              disabled={!isLoaded}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <PlaceAutocomplete
        input={searchValue}
        selectedItem={selectedItem}
        onChange={(item) => handleOptionClick(item)}
      />
    </>
  );
};

export default SearchBar;
