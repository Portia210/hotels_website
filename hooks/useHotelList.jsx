import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import useSearchStore from "@/store/useSearchStore";
import { sleep } from "@/utils/sleep";
import { SearchInputSchema } from "@/zod/searchInput";
import axios from "axios";
import { useState } from "react";
import { useAuth } from '@clerk/nextjs';

const useHotelList = () => {
  const { getToken } = useAuth();
  const searchStore = useSearchStore();
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  /**
   * Send command to CrawlerUI
   * @returns {Promise} hotels
   */
  const fetchHotelList = async () => {
    const isVaild = SearchInputSchema.safeParse(searchStore.searchInput);
    if (!isVaild.success) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("sessionId");
      const fetching = async () => {
        const data = await axios
          .get(`${TOURCOMPARE_BE_URL}/api/v1/hotels/session?sessionId=${sessionId}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${await getToken()}` }
          })
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

  return {
    loading,
    hotels,
    fetchHotelList,
  };
};

export default useHotelList;
