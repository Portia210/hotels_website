import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import { useAuth } from "@clerk/nextjs";
import axios, { isAxiosError } from "axios";

const useDestinationGallery = () => {
  const { getToken } = useAuth();

  const fetchCountryCities = async (countries) => {
    const token = await getToken();
    try {
      console.log("fetchCountryCities", countries);
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
    }
  };

  return {
    fetchCountryCities,
  };
};
export default useDestinationGallery;
