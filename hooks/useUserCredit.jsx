import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const useUserCredit = () => {
  const { getToken } = useAuth();

  const getUserRemainCredit = async feature => {
    if (!feature) throw new Error('Feature name is required');
    const token = await getToken();
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/credit/user?feature=${feature}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data);
    return response;
  };

  return {
    getUserRemainCredit,
  };
};

export default useUserCredit;
