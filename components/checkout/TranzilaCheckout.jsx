'use client';

import useCheckout from '@/hooks/useCheckout';
import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import { createIframeUrl } from '@/utils/payment';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function TranzilaCheckout() {
  const { t, locale, isReverse } = useTrans();
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const { fetchCheckoutSession } = useCheckout();
  const { getPlan } = useUserPlans();

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
    duration: 1,
    sum: planData?.sum,
    fullPrice: planData?.fullPrice,
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

  const renderOneTimeInfo = () => {
    const priceInfo = t('Pricing.priceInfo').replace(
      '{price_currency}',
      `₪ ${plan.price}`,
    );
    return priceInfo;
  };

  const renderFullPriceInfo = () => {
    const priceInfo = t('Pricing.priceInfo2').replace(
      '{price_currency}',
      `₪ ${plan?.fullPrice}`,
    );
    return priceInfo;
  };

  const renderPlan = () => {
    const planName = t(`DashboardCard.Plan.${plan?.name?.toLowerCase()}`);
    const planInfo = t('Checkout.plan_plan')?.replace('{plan}', planName);
    return planInfo;
  };

  const iframeUrl = createIframeUrl(plan, additionalInfo, locale);

  if (isLoading || !iframeUrl) {
    return (
      <div className="d-flex justify-content-center align-items-center x-gap-10">
        <div className="spinner-border spinner-border-lg" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section id="checkout" className="bg-white" dir={`${isReverse && 'rlt'}`}>
      <div
        className="h-100 d-flex justify-content-center align-items-center m-sm-5"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="col align-items-start">
                <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
                <div>
                  <h2 className="fs-md-2 text-body-emphasis mb-3">
                    {t('Checkout.orderSum')}
                  </h2>
                </div>
                <div className="position-sticky mt-4">
                  <div className="p-3 bg-light bg-opacity-10">
                    <h6 className="card-title mb-3">
                      {t('Checkout.subscription_details')}
                    </h6>
                    <div className="d-flex justify-content-between mb-1 small fs-6 ">
                      <span>
                        <i className="bi bi-box text-primary me-2"></i>
                        {renderPlan()}
                      </span>
                      <span>₪ {plan?.price}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4 small">
                      <span>{t('Checkout.total')}</span>{' '}
                      <strong className="text-dark">₪ {plan?.price}</strong>
                    </div>
                    <hr />
                    <div>
                      <label htmlFor="tnc">
                        {t('Checkout.agree_to')}{' '}
                        <a
                          href="https://docs.agent-space.com/terms-of-use"
                          target="_blank"
                          className="text-primary"
                        >
                          {t('Checkout.terms_of_use')}
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <p className="fs-6 fw-semibold mt-3">
                  {t('Checkout.subscription_renews_monthly')}
                </p>
                <p className="fs-6 mt-3">
                  {renderOneTimeInfo()} {renderFullPriceInfo()}
                </p>
              </div>
            </div>

            <div className="col-lg-6 mt-5 p-0 sm:mt-40">
              <iframe
                src={iframeUrl}
                title="tranzlia_checkout"
                width="100%"
                height="500px"
                frameBorder="0"
                scrolling="auto"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
