import userBillingService from '@/service/billing/UserBillingService';
import { useAuth } from '@clerk/nextjs';

const useUserBilling = () => {
  const { getToken } = useAuth();

  const getUserBilling = async () => {
    const token = await getToken();
    return await userBillingService.getUserBilling(token);
  };

  const getUserRecurringBilling = async () => {
    const token = await getToken();
    return await userBillingService.getUserRecurringBilling(token);
  };

  return {
    getUserBilling,
    getUserRecurringBilling,
  };
};

export default useUserBilling;
