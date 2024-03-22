import Wrapper from '@/components/layout/Wrapper';
import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { checkUserStatus } from '@/utils/roleCheck';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import MainHome from './(homes)/home_1/page';

export const metadata = {
  title: 'Agent-Space: Home',
  description: 'Agent-Space - Travel & Tour',
};

export default async function Home() {
  const isVaildStatus = await checkUserStatus();

  if (isVaildStatus) {
    const { getToken } = auth();
    const token = await getToken();

    const res = await fetch(`${TOURCOMPARE_BE_URL}/api/v1/auth/force-logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
    if (res.ok) redirect('/banned');
  }

  return (
    <Wrapper>
      <MainHome />
    </Wrapper>
  );
}
