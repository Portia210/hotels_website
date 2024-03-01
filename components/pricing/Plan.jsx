'use client';

import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import { useRouter } from 'next/navigation';

const Plan = props => {
  const { getPlanByLabel } = useUserPlans();
  const router = useRouter();
  const { t } = useTrans();
  const { isReverse, value } = props;

  const handleGetStarted = async () => {
    const plan = await getPlanByLabel(value);
    if (plan._id) router.push(`/checkout/${plan._id}`);
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
        <button
          onClick={handleGetStarted}
          className={`btn btn-lg btn-block ${
            props.outline ? 'btn-outline-primary' : 'btn-primary'
          }`}
          type="button"
        >
          {props.buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Plan;
