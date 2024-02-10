import { create } from "zustand";

const useDestinationGalleryStore = create((set) => ({
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  destinationGallery: [],
  setDestinationGallery: (gallery) => set({ destinationGallery: gallery }),
}));
export default useDestinationGalleryStore;
