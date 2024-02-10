import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import { useAuth } from "@clerk/nextjs";
import axios, { isAxiosError } from "axios";
import { useState } from "react";

const useDestinationGallery = () => {
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchCountryCities = async (countries) => {
    const token = await getToken();
    try {
      setLoading(true);
      const response = await axios.post(
        `${TOURCOMPARE_BE_URL}/api/v1/mapapi/popular-destinations`,
        {
          countries,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCountryCities,
    loading,
  };
};
export default useDestinationGallery;
