import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';
import dayjs from 'dayjs';

class PaymentTestService {
  setNextMonthPlan = async ({ clerkId, planId }, token) => {
    const url = `${TOURCOMPARE_BE_URL}/api/v1/payment-test/set-next-month-plan`;
    const response = await axios
      .post(
        url,
        {
          userId: clerkId,
          planId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  setNextChargeDate = async ({ clerkId, date }, token) => {
    const url = `${TOURCOMPARE_BE_URL}/api/v1/payment-test/set-next-charge-date`;
    const response = await axios
      .post(
        url,
        {
          userId: clerkId,
          nextChargeDate: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  setLastChargeDate = async ({ clerkId, date }, token) => {
    const url = `${TOURCOMPARE_BE_URL}/api/v1/payment-test/set-last-charge-date`;
    const response = await axios
      .post(
        url,
        {
          userId: clerkId,
          lastChargeDate: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  setNextChargeAmount = async ({ clerkId, amount }, token) => {
    const url = `${TOURCOMPARE_BE_URL}/api/v1/payment-test/set-next-charge-amount`;
    const response = await axios
      .post(
        url,
        {
          userId: clerkId,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  setBillingCycle = async ({ clerkId, billingCycle }, token) => {
    const url = `${TOURCOMPARE_BE_URL}/api/v1/payment-test/set-billing-cycle`;
    const response = await axios
      .post(
        url,
        {
          userId: clerkId,
          billingCycle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  chargeNow = async ({ clerkId }, token) => {
    const url = `${TOURCOMPARE_BE_URL}/api/v1/payment-test/charge-now`;
    const response = await axios
      .post(
        url,
        {
          userId: clerkId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };
}

const paymentTestService = new PaymentTestService();
export default paymentTestService;
