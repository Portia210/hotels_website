import paymentTestService from '@/service/payment/PaymentTestService';
import userService from '@/service/user/UserService';
import { toastError, toastLoading, toastSuccess } from '@/utils/toastUtils';
import { useAuth } from '@clerk/nextjs';
import * as Sentry from '@sentry/nextjs';
import { isAxiosError } from 'axios';

const usePaymentTestKit = email => {
  const { getToken } = useAuth();

  const getUserByEmail = async token => {
    toastLoading('Fetching user...');
    const { results } = await userService.fetchUserList({ email }, token);
    if (!results.length) {
      toastError('User not found');
      return null;
    }
    const user = results[0];
    return user;
  };

  const setNextMonthPlan = async planId => {
    if (!email) return;
    toastLoading('setting next month plan...');
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setNextMonthPlan({ clerkId, planId }, token);
      toastSuccess('Next month plan set successfully');
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const message = error.response.data.message;
        toastError('Failed to set next month plan', message);
      } else {
        toastError('Failed to set next month plan');
      }
    }
  };

  const setNextChargeDate = async date => {
    if (!email) return;
    toastLoading('setting next charge date...');
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setNextChargeDate({ clerkId, date }, token);
      toastSuccess('Next charge date set successfully');
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const message = error.response.data.message;
        toastError('Failed to set next charge date', message);
      } else {
        toastError('Failed to set next charge date');
      }
    }
  };

  const setLastChargeDate = async date => {
    if (!email) return;
    toastLoading('setting last charge date...');
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setLastChargeDate({ clerkId, date }, token);
      toastSuccess('Last charge date set successfully');
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      if (isAxiosError(error)) {
        const message = error.response.data.message;
        toastError('Failed to set next charge date', message);
      } else {
        toastError('Failed to set last charge date');
      }
    }
  };

  const setNextChargeAmount = async amount => {
    if (!email) return;
    toastLoading('setting next charge amount...');
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.setNextChargeAmount({ clerkId, amount }, token);
      toastSuccess('Next charge amount set successfully');
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const message = error.response.data.message;
        toastError('Failed to set next charge amount', message);
      } else {
        toastError('Failed to set next charge amount');
      }
    }
  };

  const setBillingCycle = async billingCycle => {
    if (!email) return;
    toastLoading('setting billing cycle...');
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
      if (isAxiosError(error)) {
        const message = error.response.data.message;
        toastError('Failed to set billing cycle', message);
      } else {
        toastError('Failed to set billing cycle');
      }
    }
  };

  const chargeNow = async () => {
    if (!email) return;
    toastLoading('charging now...');
    const token = await getToken();
    const user = await getUserByEmail(token);
    if (!user) return;
    const { clerkId } = user;
    try {
      await paymentTestService.chargeNow({ clerkId }, token);
      toastSuccess('Charge now successfully');
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const message = error.response.data.message;
        toastError('Failed to charge now', message);
      } else {
        toastError('Failed to charge now', error);
      }
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
