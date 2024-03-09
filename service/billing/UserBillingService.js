import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';

class UserBillingService {
  constructor() {}

  getUserBilling = async token => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/billing/user/billing-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data);
    return response;
  };

  getUserRecurringBilling = async token => {
    const response = await axios
      .get(`${TOURCOMPARE_BE_URL}/api/v1/billing/user/billing-recurring`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data);
    return response;
  };
}

const userBillingService = new UserBillingService();
export default userBillingService;
