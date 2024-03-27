import Landing from '@/components/landing';
import useTransServer from '@/hooks/useTransServer';

export const metadata = {
  title: 'Agent-Space: Landing Page',
  description: 'Agent-Space - Travel & Tour',
};

export default function LandingPage() {
  const { t, isReverse } = useTransServer();

  return (
    <div dir={`${isReverse && 'rtl'}`}>
      <Landing t={t} />;
    </div>
  );
}
