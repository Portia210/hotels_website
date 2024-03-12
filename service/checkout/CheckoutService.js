import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { CreateCheckoutSessionZSchema } from '@/zod/create.checkout.session';
import axios from 'axios';

class CheckoutService {
  constructor() {}

  createCheckoutSession = async (planId, token) => {
    if (!planId) throw new Error('Plan ID is required');
    try {
      const payload = await CreateCheckoutSessionZSchema.parseAsync({
        planId,
        currency: true ? 'ILS' : 'USD',
        quantity: 1,
      });
      const res = await axios
        .post(
          `${TOURCOMPARE_BE_URL}/api/v1/payment/checkout-session`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )
        .then(res => res.data);
      return res;
    } catch (error) {
      console.error('Error when create checkout session', error);
      throw error;
    }
  };
}

const checkoutService = new CheckoutService();
export default checkoutService;
