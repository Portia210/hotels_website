import { useLocale, useTranslations } from 'next-intl';
import { planContents } from './plans';
import Plan from './Plan';

const Plans = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isReverse = locale === 'he';
  const plans = planContents(t).map((obj, i) => {
    return (
      <div key={obj.header} className="px-20 py-20">
        <Plan
          value={obj.value}
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

  return (
    <div className="d-flex flex-wrap justify-content-center text-center g-5">
      {plans}
    </div>
  );
};

export default Plans;
