import hotelService from "@/service/HotelService";
import useSearchStore from "@/store/useSearchStore";
import { SearchInputSchema } from "@/zod/searchInput";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useHotelList = () => {
  const pathName = usePathname();
  const searchStore = useSearchStore();
  const [loading, setLoading] = useState(true);

  /**
   * Get session like Travelor, will be vaild in 1 hour
   * @param {string} url
   * @param {object} options
   * @returns {Promise}
   */
  const getSession = async () => {};

  /**
   * Send command to CrawlerUI
   * @returns {Promise} 2 jobsId and
   */
  const sendCommand = async (searchInput) => {
    if (!searchInput) return;
    setLoading(true);
    try {
      const response = await hotelService.sendCommand(searchInput);
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
    if (isVaild.success && pathName === "/hotel-list")
      sendCommand(isVaild.data);
  }, [searchStore.searchInput]);

  return {
    loading,
    sendCommand,
  };
};

export default useHotelList;
