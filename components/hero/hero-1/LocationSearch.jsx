"use client";

import { GOOGLE_MAP_API_KEY } from "@/constants/config";
import useSearchStore from "@/store/useSearchStore";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";

const SearchBar = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ["places"],
    region: "US",
  });
  const searchStore = useSearchStore();
  const { searchInputValidation } = searchStore;
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOptionClick = async (item) => {
    setSelectedItem(item);
    setSearchValue(item.destination);
    if (!item?.destination) return;
    let searchInput = searchStore.searchInput;
    searchInput = {
      ...searchInput,
      destination: {
        ...item,
      },
    };
    searchStore.setSearchInput(searchInput);
  };

  const loadLocation = async () => {
    if (searchStore?.searchInput?.destination) {
      const { destination } = searchStore.searchInput;
      setSearchValue(destination.destination);
      setSelectedItem(destination);
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
  }, [searchStore?.searchInput?.destination]);

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
              className={`js-search js-dd-focus form-control ${
                !searchInputValidation.destination ? "is-invalid" : ""
              }`}
              value={searchValue}
              disabled={!isLoaded}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="invalid-feedback" />
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
