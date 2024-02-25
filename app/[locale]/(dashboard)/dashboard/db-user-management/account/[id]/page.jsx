import TransConfig from '@/components/config/TransConfig';
import DashboardPage from '@/components/dashboard/dashboard/db-view-account';
import { useMessages } from 'next-intl';

export const metadata = {
  title: 'Settings || Agent-Space - Travel & Tour React NextJS Template',
  description: 'Agent-Space - Travel & Tour React NextJS Template',
};

export default function page() {
  const messages = useMessages();

  return (
    <>
      <DashboardPage />
      <TransConfig messages={messages} />
    </>
  );
}
