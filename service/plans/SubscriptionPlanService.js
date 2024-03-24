import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';

class SubscriptionPlanService {
  constructor() {}

  fetchPlans = async () => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/subscription-plan`)
      .then(res => res.data);
    return response;
  };

  fetchDefaultPlans = async () => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/default`)
      .then(res => res.data);
    return response;
  };

  getCurrentPlan = async token => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/user/plan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data);
    return response;
  };

}

const subscriptionPlanService = new SubscriptionPlanService();
export default subscriptionPlanService;
