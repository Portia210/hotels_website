import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';

class ManagePlanService {
  constructor() {}

  featureNameSuggestion = async token => {
    const response = await axios
      .get(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/feature/suggestions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => res.data);
    return response;
  };

  createPlan = async (plan, token) => {
    const response = await axios
      .post(`${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/create`, plan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data);
    return response;
  };

  updatePlan = async (planId, plan, token) => {
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/update/${planId}`,
        plan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => res.data);
    return response;
  };

  createFeature = async (planId, feature, token) => {
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/create/feature/${planId}`,
        feature,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => res.data);
    return response;
  };

  updateFeature = async (planId, feature, token) => {
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/subscription-plan/update/feature/${planId}`,
        feature,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => res.data);
    return response;
  };
}

const managePlanService = new ManagePlanService();
export default managePlanService;
