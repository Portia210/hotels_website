import { TOURCOMPARE_BE_URL } from '@/constants/environment';
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
  const fetchCheckoutSession = async () => {
    try {
      const token = await getToken();
      const res = await axios
        .get(`${TOURCOMPARE_BE_URL}/api/v1/payment/checkout-session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then(res => res.data);
      if (res.status === PaymentStatus.SUCCESS) {
        router.push('/dashboard/db-dashboard');
      } else if (res.status === PaymentStatus.FAILURE) {
        alert('Payment failed please contact support');
        router.push('/pricing');
      }
      return res;
    } catch (error) {
      console.error('Error fetching checkout session', error);
      throw error;
    }
  };

  return { fetchCheckoutSession };
};

export default useCheckout;
