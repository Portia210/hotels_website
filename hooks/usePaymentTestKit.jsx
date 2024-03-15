import paymentTestService from '@/service/payment/PaymentTestService';
import userService from '@/service/user/UserService';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-toastify';

const usePaymentTestKit = email => {
  const { getToken } = useAuth();

  const toastSuccess = message => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastError = message => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getUserByEmail = async token => {
    const { results } = await userService.fetchUserList({ email }, token);
    if (!results.length) return null;
    const user = results[0];
    return user;
  };

  const setNextMonthPlan = async planId => {
    if (!email) return;
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setNextMonthPlan({ clerkId, planId }, token);
      toastSuccess('Next month plan set successfully');
    } catch (error) {
      console.error(error);
      toastError('Failed to set next month plan');
    }
  };

  const setNextChargeDate = async date => {
    if (!email) return;
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setNextChargeDate({ clerkId, date }, token);
      toastSuccess('Next charge date set successfully');
    } catch (error) {
      console.error(error);
      toastError('Failed to set next charge date');
    }
  };

  const setLastChargeDate = async date => {
    if (!email) return;
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setLastChargeDate({ clerkId, date }, token);
      toastSuccess('Last charge date set successfully');
    } catch (error) {
      console.error(error);
      toastError('Failed to set last charge date');
    }
  };

  const setNextChargeAmount = async amount => {
    if (!email) return;
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setNextChargeAmount({ clerkId, amount }, token);
      toastSuccess('Next charge amount set successfully');
    } catch (error) {
      console.error(error);
      toastError('Failed to set next charge amount');
    }
  };

  const setBillingCycle = async billingCycle => {
    if (!email) return;
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setBillingCycle(
        { clerkId, billingCycle },
        token,
      );
      toastSuccess('Billing cycle set successfully');
    } catch (error) {
      console.error(error);
      toastError('Failed to set billing cycle');
    }
  };

  const chargeNow = async () => {
    if (!email) return;
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.chargeNow({ clerkId }, token);
      toastSuccess('Charge now successfully');
    } catch (error) {
      console.error(error);
      toastError('Failed to charge now');
    }
  };

  return {
    setNextMonthPlan,
    setNextChargeDate,
    setLastChargeDate,
    setNextChargeAmount,
    setBillingCycle,
    chargeNow,
  };
};
export default usePaymentTestKit;
