import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import ThankYouSection from '@/components/thankyou/ThankYouSection';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

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

      <section className="bg-blue-2">
        <div className="container">
          <ThankYouSection />
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(ThankYou), { ssr: false });
