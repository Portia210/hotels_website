import useSearchStore from "@/store/useSearchStore";
import { SearchInputSchema } from "@/zod/searchInput";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useHotelList = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
  const [loading, setLoading] = useState(true);

  /**
   * Send command to CrawlerUI
   * @returns {Promise} 2 jobsId and
   */
  const sendCommand = async (searchInput) => {
    if (!searchInput) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("sessionId");
      const response = await axios
        .get(`/api/hotel-list/session?sessionId=${sessionId}`)
        .then((res) => res.data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("sendCommand error:::", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   * @param {object} jobs - `bookingJobId` and `travelorJobId`
   */
  const fetchHotelList = async (jobs) => {};

  useEffect(() => {
    const isVaild = SearchInputSchema.safeParse(searchStore.searchInput);
    if (isVaild.success && pathName === "/hotel-list") {
      console.log("isVaild.data", isVaild.data);
      sendCommand(isVaild.data);
    }
  }, [searchStore.searchInput]);

  return {
    loading,
    sendCommand,
  };
};

export default useHotelList;
