import React from 'react';
import { planContents } from './plans';
import { useLocale, useTranslations } from 'next-intl';

const Plan = props => {
  const { t, isReverse } = props;
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

const Plans = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isReverse = locale === 'he';
  const plans = planContents(t).map((obj, i) => {
    return (
      <div key={obj.header} className="px-20 py-20">
        <Plan
          t={t}
          isReverse={isReverse}
          header={obj.header}
          price={obj.price}
          currency={obj.currency}
          features={obj.features}
          buttonLabel={obj.buttonLabel}
          outline={obj.outline}
        />
      </div>
    );
  });

  return <div className="d-flex flex-wrap justify-content-center text-center g-5">{plans}</div>;
};

export default Plans;
