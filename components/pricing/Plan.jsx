'use client';

import useCheckout from '@/hooks/useCheckout';
import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import { useRouter } from 'next/navigation';

const Plan = props => {
  const { isReverse, value, currentPlan } = props;
  const router = useRouter();
  const { getPlanByLabel } = useUserPlans();
  const { createCheckoutSession } = useCheckout();
  const { t } = useTrans();

  const handleGetStarted = async () => {
    const plan = await getPlanByLabel(value);
    if (plan._id) {
      const checkoutSessionId = await createCheckoutSession(plan._id);
      router.push(
        `/checkout/${plan._id}?checkoutSessionId=${checkoutSessionId}`,
      );
    }
  };

  const handleDowngradePlan = async () => {
    const plan = await getPlanByLabel(value);
    if (plan._id) {
      console.log('Downgrade plan');
    }
  };

  const renderGetStartedBtn = async () => {
    let btnText = t('Pricing.getStarted');
    let btnDisabled = false;

    if (currentPlan && currentPlan.label === value) {
      btnText = t('Pricing.currentPlan');
      btnDisabled = true;
    } else if (currentPlan && currentPlan.label === 'Advanced') {
      btnText = t('Pricing.downgradePlan');
    } else if (currentPlan && currentPlan.label === 'Standard') {
      btnText = t('Pricing.upgradePlan');
    }

    return (
      <button
        onClick={!btnDisabled ? handleDowngradePlan : handleGetStarted}
        className={`btn btn-lg btn-block ${
          props.outline ? 'btn-outline-primary' : 'btn-primary'
        }`}
        disabled={btnDisabled}
        type="button"
      >
        {btnText}
      </button>
    );
  };

  return (
    <div className="card shadow-sm" style={{ minWidth: 370 }}>
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{props.header}</h4>
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
          {props.features.map((feature, i) => (
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
