"use client";

import { useCallback, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function PlaceAutocomplete({ input, selectedItem, onChange }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleGooglePlaceClick = async (placeId, address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    onChange({ placeId, destination: address, lat, lng });
  };

  const handleInput = useCallback(
    (input) => {
      if (!input) {
        clearSuggestions();
      } else {
        setValue(input);
      }
    },
    [input]
  );

  useEffect(() => {
    handleInput(input);
  }, [input]);

  if (!ready) return null;
  return (
    <>
      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
          <ul className="y-gap-5 js-results">
            {status === "OK" &&
              data?.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.place_id === item.place_id
                      ? "active"
                      : ""
                  }`}
                  key={item.place_id}
                  role="button"
                  onClick={() =>
                    handleGooglePlaceClick(item.place_id, item.description)
                  }
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {value}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item?.description}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            {!input && (
              <li className="text-15 lh-12 fw-500 js-search-option-target">
                Enter a location
              </li>
            )}
            {status === "ZERO_RESULTS" && (
              <li className="text-15 lh-12 fw-500 js-search-option-target">
                No results found
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
