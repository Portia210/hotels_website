import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const useUsers = () => {
  const { getToken } = useAuth();

  const fetchUsers = async () => {
    const token = await getToken();
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/users/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => res.data);
    return response;
  };

  return {
    fetchUsers,
  };
};

export default useUsers;
