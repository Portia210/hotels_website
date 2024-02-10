"use client";
import useDestinationGallery from "@/hooks/useDestinationGallery";
import useDestinationGalleryStore from "@/store/useDestinationGalleryStore";
import { useEffect, useState } from "react";
import Locations from "./Locations";

export default function DestinationGallery() {
  const [maxResult, setMaxResult] = useState(8);
  const { selectedCountry, destinationGallery, setDestinationGallery } =
    useDestinationGalleryStore();

  const { fetchCountryCities } = useDestinationGallery();

  const getCountryCities = async (country) => {
    const response = await fetchCountryCities(country.label);
    setDestinationGallery(response.results);
  };

  const handleLoadMore = () => {
    if (destinationGallery.length > 0) {
      setMaxResult(destinationGallery.length);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      getCountryCities(selectedCountry);
      setMaxResult(8);
    }
  }, [selectedCountry]);

  if (!selectedCountry) return null;

  return (
    <section className="layout-pb-md">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">
                Cities in {selectedCountry?.label}
              </h2>
            </div>
          </div>
          {/* End .col */}

          {destinationGallery.length > 8 && (
            <div className="col-auto">
              <button
                onClick={handleLoadMore}
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </button>
            </div>
          )}
          {/* End .col */}
        </div>
        {/* End .row */}

        <div className="row y-gap-30 pt-20 sm:pt-20">
          <Locations gallery={destinationGallery?.slice(0, maxResult)} />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
