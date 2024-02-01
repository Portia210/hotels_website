import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import useSearchStore from "@/store/useSearchStore";
import axios from "axios";
import Cookies from "js-cookie";
import { cloneDeep } from "lodash";
import { useAuth } from '@clerk/nextjs';
import { useRouter } from "next/navigation";
import {useState} from "react";

const useSearchBar = () => {
  const router = useRouter();
  const { getToken, isSignedIn } = useAuth();
  const searchStore = useSearchStore();
  const [loading, setLoading] = useState(false);

  /**
   * Get sessionid will be vaild in 1 hour
   * @returns {Promise}
   */
  const getSession = async (searchInput) => {
    try {
      const token = await getToken();
      searchInput.children = searchInput.childrens;
      searchInput.adult = searchInput.adults;
      const sessionId = await axios
        .post(`${TOURCOMPARE_BE_URL}/api/v1/hotels/session`, searchInput, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.data);
      return sessionId;
    } catch (error) {
      console.error("getSession error:::", error);
      throw error;
    }
  };

  const handleSearch = async (path) => {
    if (!isSignedIn) return router.push("/login");
    if (!path) throw Error("search path is required");
    const destinationInput = document.getElementById("destinationInput").value;
    if (!destinationInput || !searchStore?.searchInput?.destination?.placeId) {
      searchStore.setSearchInputValidation({
        destination: false,
      });
      setTimeout(() => {
        searchStore.setSearchInputValidation({
          destination: true,
        });
      }, 2500);
    } else {
      if (loading) return;
      setLoading(true);
      searchStore.setSearchInputValidation({
        destination: true,
      });
      const sessionId = await getSession(searchStore.searchInput);
      let searchInput = cloneDeep(searchStore.searchInput);
      Cookies.set("searchInput", JSON.stringify(searchInput), {
        expires: 1,
      });
      setTimeout(()=>{
        setLoading(false);
      }, 2000)
      delete searchInput.childrenAges;
      searchInput.sessionId = sessionId;
      searchInput.destination = JSON.stringify(searchInput.destination);
      const params = new URLSearchParams(searchInput);
      window.location.href = `${path}?${params.toString()}`;
    }
  };

  return {
    handleSearch,
  };
};
export default useSearchBar;
