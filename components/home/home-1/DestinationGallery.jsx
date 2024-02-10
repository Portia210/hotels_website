"use client";
import useDestinationGallery from "@/hooks/useDestinationGallery";
import useDestinationGalleryStore from "@/store/useDestinationGalleryStore";
import { useEffect, useState } from "react";
import Locations from "./Locations";

export default function DestinationGallery() {
  const [maxResult, setMaxResult] = useState(8);
  const { selectedCountry, destinationGallery, setDestinationGallery } =
    useDestinationGalleryStore();

  const { fetchCountryCities, loading } = useDestinationGallery();

  const getCountryCities = async (country) => {
    const response = await fetchCountryCities(country.label);
    const cities = Array.from(
      new Set(response.results.map((city) => city.name))
    ).map((name) => response.results.find((city) => city.name === name));

    setDestinationGallery(cities);
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

          <div className="col-auto">
            {loading ? (
              <div className="d-flex align-items-center x-gap-10">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              destinationGallery.length > 8 && (
                <button
                  onClick={handleLoadMore}
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  More <div className="icon-arrow-top-right ml-15" />
                </button>
              )
            )}
          </div>
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
