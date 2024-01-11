import useSearchStore from "@/store/useSearchStore";
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
      console.log("searchStore.searchInput", searchStore.searchInput);
      Router.push(path);
    }
  };

  return {
    handleSearch,
  };
};
export default useSearchBar;
