import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import PricingSection from '@/components/pricing/PricingSection';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'GoTrip: Shorten Your Links Easily!',
  description:
    "Make your web links shorter and easier to share. It's simple, quick, and helps your messages look neat and elegant",
};

const PricingPage = () => {
  const t = useTranslations();

  return (
    <>
      {/* End Page Title */}

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
                  <h1 className="text-30 sm:text-26 fw-600 mb-10">{t('Pricing.title')}</h1>
                  <h2 className="text-22 fw-600" style={{ maxWidth: 700 }}>
                    {t('Pricing.subtitle')}
                  </h2>
                </div>
              </div>
            </div>
            {/* End text-center */}
            <div className="col-12">
              <PricingSection />
            </div>
          </div>
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(PricingPage), { ssr: false });
