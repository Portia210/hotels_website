import { create } from 'zustand';

const useDestinationGalleryStore = create(set => ({
  selectedCountry: null,
  setSelectedCountry: country => set({ selectedCountry: country }),
  destinationGallery: [],
  setDestinationGallery: destinationGallery => set({ destinationGallery }),
  selectedCity: null,
  setSelectedCity: city => set({ selectedCity: city }),
  touristAttractionsGallery: [],
  setTouristAttractionsGallery: touristAttractionsGallery =>
    set({ touristAttractionsGallery }),
}));
export default useDestinationGalleryStore;
