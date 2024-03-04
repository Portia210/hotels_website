'use client';

import useCheckout from '@/hooks/useCheckout';
import useUserPlans from '@/hooks/useUserPlans';
import { createIframeUrl } from '@/utils/payment';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

export default function TranzilaCheckout() {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const { fetchCheckoutSession } = useCheckout();
  const { getPlan } = useUserPlans();

  const locale = useLocale();

  const fetchPlan = async () => {
    const plan = await getPlan(id);
    setOriginPlan(plan);
  };

  useQuery({
    queryKey: ['fetchPlan'],
    queryFn: () => fetchPlan(user.id),
  });

  const { data: planData, isLoading } = useQuery({
    queryKey: ['fetchCheckoutSession'],
    queryFn: () => {
      const urlParams = new URLSearchParams(window.location.search);
      const checkoutSessionId = urlParams.get('checkoutSessionId');
      return fetchCheckoutSession(checkoutSessionId);
    },
    refetchInterval: 1000,
  });

  const plan = {
    name: planData?.name,
    id,
    price: planData?.price,
    currency: 1,
    duration: planData?.quantity,
    sum: planData?.sum,
  };

  if (!isLoaded) return null;

  const json_purchase_data = JSON.stringify([
    {
      product_name: plan.id,
      product_quantity: plan.duration,
      product_price: plan.price,
    },
  ]);

  const additionalInfo = {
    json_purchase_data: encodeURIComponent(json_purchase_data),
    email: user.emailAddresses[0].emailAddress,
  };

  const iframeUrl = createIframeUrl(plan, additionalInfo, locale);

  if (isLoading) return null;

  return (
    <div>
      <iframe
        id="tranzila-frame"
        allowpaymentrequest="true"
        name="tranzila"
        src={iframeUrl}
        width="100%"
        height="500px"
      ></iframe>
    </div>
  );
}
