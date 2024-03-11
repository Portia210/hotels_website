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

  const openCheckoutWindow = () => {
    const popupWidth = 400;
    const popupHeight = 500;
    const left = window.innerWidth / 2 - popupWidth / 2;
    const top = window.innerHeight / 2 - popupHeight / 2;
    window.open(
      iframeUrl,
      '',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`,
    );
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center x-gap-10">
        <div className="spinner-border spinner-border-lg" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );

  return (
    <div className="row">
      <div className="col-8 border border-black pr-10">
        <h2 className="border-bottom border-primary">Order summary</h2>
        <div className="pt-10">
          <div className="fw-500 fs-3">
            <span className="text-primary">
              <i className="bi bi-box"></i>
              <span> {plan.name}</span>
            </span>
            {' - '}
            <span>{plan.duration} months</span>
          </div>
        </div>
      </div>
      <div className="col-4 border border-black border-start-0 text-center ">
        <h4>Total: {plan.sum}</h4>
        <button
          onClick={openCheckoutWindow}
          type="button"
          className="btn btn-primary"
        >
          Checkout now <i className="bi bi-cart3"></i>
        </button>
      </div>
    </div>
  );
}
