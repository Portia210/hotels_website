import Landing from '@/components/landing';
import Head from 'next/head';

export const metadata = {
  title: 'Agent-Space: Landing Page',
  description: 'Agent-Space - Travel & Tour',
};

export default function LandingPage() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </Head>
      <Landing />
    </>
  );
}
