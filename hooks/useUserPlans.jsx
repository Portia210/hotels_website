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

  const selfUpgradePlan = async planName => {
    if (!planName) throw Error('Plan name is required!');
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/upgrade`,
        {
          planName,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  const upgradeUserPlan = async (planName, userId) => {
    if (!planName) throw Error('Plan name is required!');
    if (!userId) throw Error('User Id is required!');
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/manager-upgrade`,
        {
          planName,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  return {
    fetchPlans,
    selfUpgradePlan,
    upgradeUserPlan,
  };
};

export default useUserPlans;
