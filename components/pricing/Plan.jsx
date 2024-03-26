'use client';

import useCheckout from '@/hooks/useCheckout';
import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { getFeature } from './plans';

const Plan = props => {
  const { isReverse, label, currentPlan } = props;
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { getPlanByLabel } = useUserPlans();
  const { createCheckoutSession } = useCheckout();
  const { t } = useTrans();

  const handleGetStarted = async () => {
    if (!isSignedIn) return router.push('/login');
    const plan = await getPlanByLabel(label);
    if (plan._id) {
      const checkoutSessionId = await createCheckoutSession(plan._id);
      router.push(
        `/checkout/${plan._id}?checkoutSessionId=${checkoutSessionId}`,
      );
    }
  };

  const renderGetStartedBtn = () => {
    let btnText = t('Pricing.getStarted');
    let btnDisabled = false;
    let isDowngrade = false;

    if (currentPlan) {
      if (currentPlan.label === label) {
        btnText = t('Pricing.currentPlan');
        btnDisabled = true;
      } else if (currentPlan.label === 'Advanced') {
        btnText = t('Pricing.getStarted');
        isDowngrade = true;
      } else if (currentPlan.label === 'Standard') {
        btnText = t('Pricing.upgradePlan');
      }
    }

    const commonButtonProps = {
      className: `btn btn-lg btn-block ${
        props.outline ? 'btn-outline-primary' : 'btn-primary'
      }`,
      type: 'button',
    };

    if (isDowngrade) {
      return (
        <button
          {...commonButtonProps}
          disabled={true}
          data-bs-toggle="modal"
          data-bs-target="#downgradePlanModal"
        >
          {btnText}
        </button>
      );
    }

    return (
      <button
        {...commonButtonProps}
        onClick={handleGetStarted}
        disabled={btnDisabled}
      >
        {btnText}
      </button>
    );
  };

  return (
    <div className="card shadow-sm" style={{ minWidth: 370 }}>
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{label}</h4>
      </div>
      <div className="card-body" dir={isReverse ? 'rtl' : 'ltr'}>
        <h1 className="card-title pricing-card-title">
          {!isNaN(props.price) ? (
            <>
              {`${props.price} ${props.currency || ''}`}
              <small className="text-muted">/{t('Pricing.permonth')}</small>
            </>
          ) : (
            <>{`${props.price} ${props.currency || ''}`}</>
          )}
        </h1>
        <ul className="list-unstyled mt-3 mb-10">
          {getFeature(label, t).map((feature, i) => (
            <li key={i} className="text-20">
              <i
                className={`bi bi-check-circle-fill text-success ${
                  isReverse ? 'ml-10' : 'mr-10'
                }`}
              ></i>
              {feature}
            </li>
          ))}
        </ul>
        {renderGetStartedBtn()}
      </div>
    </div>
  );
};

export default Plan;
