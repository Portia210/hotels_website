import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Agent-Space: Thank you!',
  description:
    "Thank you for your purchase! We're excited to have you on board. You can now start using our services.",
};

const ThankYou = () => {
  const t = useTranslations();

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="text-center mb-3 mb-md-5">
          <h2>Thank you !</h2>
        </div>
        <div className="container">
          <div className="d-flex justify-content-center">
            <p>
              Thank you for your purchase! We're excited to have you on board. You can now start using our services.
            </p>
          </div>
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(ThankYou), { ssr: false });
