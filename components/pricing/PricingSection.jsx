import { useLocale, useTranslations } from 'next-intl';
import Plan from './Plan';
import { planContents } from './plans';
import DowngradeModal from './DowngradeModal';

const planMapping = plans => {
  return plans;
};

const PricingSection = ({ defaultPlans, currentPlan }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isReverse = locale === 'he';
  const plans = planMapping(defaultPlans).map((obj, i) => {
    console.log('obj -->', obj)
    return (
      <div key={obj._id} className="px-20 py-20">
        <Plan
          currentPlan={currentPlan}
          label={obj.label}
          isReverse={isReverse}
          price={obj.price}
          currency={'₪'}
          features={obj.features}
          outline={false}
        />
      </div>
    );
  });

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center text-center g-5">
        {plans}
      </div>
      <DowngradeModal />
    </>
  );
};

export default PricingSection;
