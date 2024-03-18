import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import checkoutService from '@/service/checkout/CheckoutService';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const PaymentStatus = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
};

const useCheckout = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  /**
   * Fetch checkout session
   * @param {*} checkoutSessionId
   * @param {*} window - Tranzila checkout popup window
   * @returns
   */
  const fetchCheckoutSession = async (checkoutSessionId, window) => {
    try {
      if (!checkoutSessionId) throw Error('Checkout session id is required');
      const token = await getToken();
      const res = await axios
        .get(
          `${TOURCOMPARE_BE_URL}/api/v1/payment/checkout-session?checkoutSessionId=${checkoutSessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )
        .then(res => res.data);
      if (res.status === PaymentStatus.SUCCESS) {
        if (window) window.close();
        router.push('/thankyou');
      } else if (res.status === PaymentStatus.FAILURE) {
        alert('Payment failed please contact support');
        router.push('/pricing');
      }
      return res;
    } catch (error) {
      console.error('Error fetching checkout session', error);
      router.push('/pricing');
    }
  };

  const createCheckoutSession = async planId => {
    const token = await getToken();
    return await checkoutService.createCheckoutSession(planId, token);
  };

  return { fetchCheckoutSession, createCheckoutSession };
};

export default useCheckout;
