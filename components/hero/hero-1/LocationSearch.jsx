"use client";

import { GOOGLE_MAP_API_KEY } from "@/constants/config";
import useSearchStore from "@/store/useSearchStore";
import { useLoadScript } from "@react-google-maps/api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";

const SearchBar = () => {
  const pathName = usePathname();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ["places"],
    region: "US",
  });
  const searchStore = useSearchStore();
  const { searchInputValidation } = searchStore;
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const updateInputDestination = (destination) => {
    let searchInput = searchStore.searchInput;
    searchInput = {
      ...searchInput,
      destination,
    };
    searchStore.setSearchInput(searchInput);
  };

  const handleOptionClick = async (item) => {
    setSelectedItem(item);
    setSearchValue(item.destination);
    if (!item?.destination) return;
    updateInputDestination(item);
  };

  const loadLocation = async () => {
    if (pathName !== "/hotel-list") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("destination")) {
      const destination = JSON.parse(params.get("destination"));
      setSelectedItem(destination);
      setSearchValue(destination.destination);
      setTimeout(() => {
        updateInputDestination(destination);
      });
    }
  };

  useEffect(() => {
    if (!searchValue) {
      searchStore.setSearchInput({
        ...searchStore.searchInput,
        destination: null,
      });
    }
  }, [searchValue]);

  useEffect(() => {
    loadLocation();
  }, [pathName]);

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
              value={searchValue}
              disabled={!isLoaded}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="invalid-feedback">Enter your location</div>
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
