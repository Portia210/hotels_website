import { useLocale, useTranslations } from 'next-intl';
import Plan from './Plan';
import { planContents } from './plans';

const PricingSection = ({ currentPlan }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isReverse = locale === 'he';
  const plans = planContents(t).map((obj, i) => {
    return (
      <div key={obj.header} className="px-20 py-20">
        <Plan
          currentPlan={currentPlan}
          value={obj.value}
          isReverse={isReverse}
          header={obj.header}
          price={obj.price}
          currency={obj.currency}
          features={obj.features}
          outline={obj.outline}
        />
      </div>
    );
  });

  return (
    <div className="d-flex flex-wrap justify-content-center text-center g-5">
      {plans}
    </div>
  );
};

export default PricingSection;
