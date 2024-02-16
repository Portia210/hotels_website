import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import useSearchStore from "@/store/useSearchStore";
import { sleep } from "@/utils/sleep";
import { SearchInputSchema } from "@/zod/searchInput";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useHotelList = () => {
  const { getToken } = useAuth();
  const { searchInput, isExpired, setIsExpired } = useSearchStore();
  const isSearchFormVaild = SearchInputSchema.safeParse(searchInput);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  const fetchHotel = async (sessionId, token) => {
    if (!sessionId) throw Error("sessionId is required");
    const url = `${TOURCOMPARE_BE_URL}/api/v1/hotels/session?sessionId=${sessionId}`;

    const data = await axios
      .get(url, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
    setIsExpired(data.isExpired);
    const hotels = data.results;
    setHotels((prevHotels) => {
      const updatedHotels = [...prevHotels];
      for (const newHotel of hotels) {
        if (
          !updatedHotels.find(
            (oldHotel) => oldHotel.travelorLink === newHotel.travelorLink
          )
        ) {
          updatedHotels.push(newHotel);
        }
      }
      return updatedHotels;
    });
    return data;
  };

  /**
   * Send command to CrawlerUI
   * @returns {Promise} hotels
   */
  const fetchHotelList = useCallback(async () => {
    const token = await getToken();
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("sessionId");
      let response = await fetchHotel(sessionId, token);
      do {
        if (response.status === "FINISHED") {
          response = await fetchHotel(sessionId, token);
          break;
        }
        await sleep(2000);
        response = await fetchHotel(sessionId, token);
      } while (response.status === "RUNNING");
      setLoading(false);
    } catch (error) {
      console.error("sendCommand error:::", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isSearchFormVaild.success]);

  useEffect(() => {
    if (isSearchFormVaild.success) fetchHotelList();
  }, [isSearchFormVaild.success]);

  return {
    isExpired,
    loading,
    hotels,
  };
};

export default useHotelList;
