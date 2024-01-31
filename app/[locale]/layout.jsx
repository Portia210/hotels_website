"use client";
import { ClerkProvider } from "@clerk/nextjs";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ToastContainer } from "react-toastify";
import SrollTop from "../../components/common/ScrollTop";
import "../../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
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
          <link rel="icon" href="./favicon.ico" />
        </head>
        <body>
          <main>
            <ToastContainer />
            {children}
            <SrollTop />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
