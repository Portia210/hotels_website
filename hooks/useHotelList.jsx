import { useState } from "react";

const useHotelList = () => {
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
   * @param {string} searchInput
   * @param {string} sessionId
   * @returns {Promise} 2 jobsId and
   */
  const sendCommand = async (sessionId, searchInput) => {};

  /**
   *
    * @param {object} jobs - `bookingJobId` and `travelorJobId`
   */
  const fetchHotelList = async (jobs) => {};

  return {
    loading,
  };
};

export default useHotelList;
