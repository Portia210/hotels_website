'use client';

import useCheckout from '@/hooks/useCheckout';
import useUserPlans from '@/hooks/useUserPlans';
import { createIframeUrl } from '@/utils/payment';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TranzilaCheckout() {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const { fetchCheckoutSession, createCheckoutSession } = useCheckout();
  const { getPlan } = useUserPlans();
  const [originPlan, setOriginPlan] = useState(null);

  const locale = useLocale();

  const myplan = {
    name: originPlan?.label,
    id: originPlan?._id,
    price: originPlan?.price,
    currency: 1,
    duration: 12,
  };

  const createCheckoutSessionMutation = useMutation({
    mutationFn: () => createCheckoutSession(myplan),
  });

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
    queryFn: () =>  fetchCheckoutSession(user.id),
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

  useEffect(() => {
    if (!originPlan) return;
    createCheckoutSessionMutation.mutate();
  }, [originPlan]);

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
