import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

const useUserPlans = () => {
  const { getToken } = useAuth();

  const fetchPlans = async () => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/subscription-plan`)
      .then(res => res.data);
    return response;
  };

  return {
    fetchPlans,
  };
};

export default useUserPlans;
