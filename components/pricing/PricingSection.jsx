import React from 'react';
import { planContents } from './plans';
import { useTranslations } from 'next-intl';

const Plan = props => {
  const t = useTranslations();
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{props.header}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          {!isNaN(props.price) ? (
            <>
              {`${props.price} ${props.currency || ''}`}
              <small className="text-muted">{t('Pricing.permonth')}</small>
            </>
          ) : (
            <>{`${props.price} ${props.currency || ''}`}</>
          )}
        </h1>
        <ul className="list-unstyled mt-3 mb-10">
          {props.features.map((feature, i) => (
            <li key={i}>{feature}</li>
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
  const plans = planContents.map((obj, i) => {
    return (
      <div key={obj.header} className="col-sm-6 col-md-4">
        <Plan
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

  return <div className="row text-center g-5">{plans}</div>;
};

export default Plans;
