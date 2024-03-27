import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import Landing from '@/components/landing';
import useTransServer from '@/hooks/useTransServer';

export const metadata = {
  title: 'Agent-Space: Landing Page',
  description: 'Agent-Space - Travel & Tour',
};

export default function LandingPage() {
  const { t, isReverse } = useTransServer();

  return (
    <>
      <div className="header-margin"></div>
      <DefaultHeader />
      <section dir={`${isReverse && 'rtl'}`} className="mb-40">
        <Landing t={t} />;
      </section>
      <DefaultFooter />
    </>
  );
}
