'use client';
import TanstackProvider from '@/providers/TanstackProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SrollTop from '../../components/common/ScrollTop';
import '../../styles/index.scss';

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

export default function RootLayout({ children, params }) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        ></link>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1RSZ3561QM"
        ></script>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <body>
          <TanstackProvider>
            <main>
              <ToastContainer />
              {children}
              <SrollTop />
            </main>
          </TanstackProvider>
        </body>
      </ClerkProvider>
      <GoogleAnalytics gaId="G-1RSZ3561QM" />
      <GoogleTagManager gtmId="G-1RSZ3561QM" />
    </html>
  );
}
