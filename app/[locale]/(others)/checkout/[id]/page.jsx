import TranzilaCheckout from '@/components/checkout/TranzilaCheckout';
import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Agent-Space: Checkout',
  description: 'Checkout now',
};

const CheckoutPage = async ({ params }) => {
  const checkoutSessionId = params.id
  const t = await getTranslations('Checkout')

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-sm layout-pb-md bg-blue-2">
        <div className="container">
          <TranzilaCheckout />
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(CheckoutPage), { ssr: false });
