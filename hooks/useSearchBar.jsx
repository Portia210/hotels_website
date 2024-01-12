import useSearchStore from "@/store/useSearchStore";
import { cloneDeep } from "lodash";
import { usePathname, useRouter } from "next/navigation";

const useSearchBar = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
  const Router = useRouter();

  const handleSearch = (path) => {
    if (!path) throw Error("handleSearch: path is required");
    const destinationInput = document.getElementById("destinationInput").value;
    if (!destinationInput) {
      searchStore.setSearchInputValidation({
        destination: false,
      });
      setTimeout(() => {
        searchStore.setSearchInputValidation({
          destination: true,
        });
      }, 2500);
    } else {
      searchStore.setSearchInputValidation({
        destination: true,
      });
      const searchInput = cloneDeep(searchStore.searchInput);
      delete searchInput.childrenAges;
      searchInput.destination = JSON.stringify(searchInput.destination);
      const params = new URLSearchParams(searchInput);
      Router.push(`${path}?${params.toString()}`);
    }
  };

  return {
    handleSearch,
  };
};
export default useSearchBar;
