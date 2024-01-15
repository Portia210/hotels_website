import useSearchStore from "@/store/useSearchStore";
import { sleep } from "@/utils/sleep";
import { SearchInputSchema } from "@/zod/searchInput";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useHotelList = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  /**
   * Send command to CrawlerUI
   * @returns {Promise} hotels
   */
  const fetchHotelList = async (searchInput) => {
    if (!searchInput) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("sessionId");
      const fetching = async () => {
        const data = await axios
          .get(`/api/hotel-list/session?sessionId=${sessionId}`)
          .then((res) => res.data);
        const hotels = data.results;
        setHotels(hotels);
        return data;
      };

      let response = await fetching();
      do {
        if (response.status === "FINISHED") break;
        await sleep(2000);
        response = await fetching();
      } while (response.status === "RUNNING");
      setLoading(false);
    } catch (error) {
      console.error("sendCommand error:::", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isVaild = SearchInputSchema.safeParse(searchStore.searchInput);
    if (isVaild.success && pathName === "/hotel-list") {
      fetchHotelList(isVaild.data);
    }
  }, [searchStore.searchInput]);

  return {
    loading,
    hotels,
    fetchHotelList,
  };
};

export default useHotelList;
