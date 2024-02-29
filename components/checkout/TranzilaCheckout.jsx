'use client';

import useCheckout from '@/hooks/useCheckout';
import { createIframeUrl } from '@/utils/payment';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function TranzilaCheckout() {
  const { user, isLoaded } = useUser();
  const { fetchCheckoutSession, createCheckoutSession } = useCheckout();
  const locale = useLocale();

  const plan = {
    name: 'Plan B',
    id: '65c363371936ee997a061a4a',
    price: 20,
    currency: 1,
    duration: 12, // months
  };

  const createCheckoutSessionMutation = useMutation({
    mutationFn: () => createCheckoutSession(plan),
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fetchCheckoutSession'],
    queryFn: () => fetchCheckoutSession(user.id),
    refetchInterval: 1000,
  });

  useEffect(() => createCheckoutSessionMutation.mutate(), []);

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
