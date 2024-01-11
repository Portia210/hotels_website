import useSearchStore from "@/store/useSearchStore";
import { flatten } from "flat";
import { useRouter } from "next/navigation";

const useSearchBar = () => {
  const searchStore = useSearchStore();
  const Router = useRouter();

  const handleSearch = (path) => {
    if (!path) throw Error("handleSearch: path is required");
    if (!searchStore?.searchInput?.destination) {
      searchStore.setSearchInputValidation({
        destination: false,
      });
      setTimeout(() => {
        searchStore.setSearchInputValidation({
          destination: true,
        });
      }, 2000);
    } else {
      searchStore.setSearchInputValidation({
        destination: true,
      });
      delete searchStore.searchInput.childrenAges;
      const flattenObj = flatten(searchStore.searchInput);
      const params = new URLSearchParams(flattenObj);
      Router.push(`${path}?${params.toString()}`);
    }
  };

  return {
    handleSearch,
  };
};
export default useSearchBar;
