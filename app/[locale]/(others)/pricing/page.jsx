import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import PricingSection from '@/components/pricing/PricingSection';
import subscriptionPlanService from '@/service/plans/SubscriptionPlanService';
import { getTranslations, getMessages } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';
import TransConfig from '@/components/config/TransConfig';

export const metadata = {
  title: 'Agent-Space: Pricing',
  description:
    'Pricing page for Agent-Space. Choose the best plan for your needs.',
};

const fetchCurrentPlan = async () => {
  const { getToken, userId } = auth();
  if (!userId) return;
  const token = await getToken();
  const currentPlan = await subscriptionPlanService.getCurrentPlan(token);
  return currentPlan;
};

const fetchDefaultPlan = async () => {
  const defaultPlan = await subscriptionPlanService.fetchDefaultPlans();
  return defaultPlan;
};

const PricingPage = async () => {
  const t = await getTranslations('Pricing');
  const messages = await getMessages();
  const currentPlan = await fetchCurrentPlan();
  const defaultPlans = await fetchDefaultPlan();
  return (
    <>
      <TransConfig messages={messages} />

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-lg bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="w-100 text-center mb-50 d-flex justify-content-center">
                <div className="md:w-75 sm:w-100">
                  <h1 className="text-30 sm:text-26 fw-600 mb-10">
                    {t('title')}
                  </h1>
                  <h2 className="text-22 fw-600" style={{ maxWidth: 700 }}>
                    {t('subtitle')}
                  </h2>
                </div>
              </div>
            </div>
            {/* End text-center */}
            <div className="col-12">
              <PricingSection
                defaultPlans={defaultPlans}
                currentPlan={currentPlan}
              />
            </div>
          </div>
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(PricingPage), { ssr: false });
