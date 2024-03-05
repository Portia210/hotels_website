import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import subscriptionPlanService from '@/service/plans/SubscriptionPlanService';
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

  const getPlan = async id => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/detail/${id}`)
      .then(res => res.data);
    return response;
  };

  const getPlanByLabel = async label => {
    if (!label) throw Error('Label is required!');
    const response = await axios
      .get(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/label?label=${label}`,
      )
      .then(res => res.data);
    return response;
  };

  const getCurrentPlan = async () => {
    const token = await getToken();
    return subscriptionPlanService.getCurrentPlan(token);
  };

  const selfUpgradePlan = async planId => {
    if (!planId) throw Error('Planid is required!');
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/upgrade`,
        {
          planId,
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

  const upgradeUserPlan = async (planId, userId) => {
    if (!planId) throw Error('Plan name is required!');
    if (!userId) throw Error('User Id is required!');
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/manager-upgrade`,
        {
          planId,
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
    getPlan,
    getCurrentPlan,
    getPlanByLabel,
    fetchPlans,
    selfUpgradePlan,
    upgradeUserPlan,
  };
};

export default useUserPlans;
