import DefaultFooter from '@/components/footer/default';
import Header1 from '@/components/header/header-1';
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
      <Header1 />
      <section dir={`${isReverse && 'rtl'}`} className="mb-40">
        <Landing t={t} />;
      </section>
      <DefaultFooter />
    </>
  );
}
