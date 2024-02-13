import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const useShortenLink = () => {
  const { getToken } = useAuth();

  const shortenLink = async (target) => {
    if (!target) return;
    try {
      const token = await getToken();
      return await axios
        .post(
          `${TOURCOMPARE_BE_URL}/api/v1/shortlink`,
          {
            target,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => res.data);
    } catch (error) {
      console.error(error);
      return "";
    }
  };
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { shortenLink, isValidURL };
};

export default useShortenLink;
