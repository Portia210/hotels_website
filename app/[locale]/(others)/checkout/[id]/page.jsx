import TranzilaCheckout from '@/components/checkout/TranzilaCheckout';
import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';
import checkoutService from '@/service/checkout/CheckoutService';

export const metadata = {
  title: 'Agent-Space: Checkout',
  description: 'Checkout now',
};
const getCheckoutSession = async planId => {
  const { getToken } = auth();
  const token = await getToken();
  return await checkoutService.createCheckoutSession(planId, token);
};

const CheckoutPage = async ({ params }) => {
  const planId = params.id;
  const checkoutSessionId = await getCheckoutSession(planId);
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-md bg-blue-2">
        <div className="text-center mb-3 mb-md-5">
          <h2>Checkout Page</h2>
        </div>
        <div className="container">
          {checkoutSessionId && (
            <TranzilaCheckout checkoutSessionId={checkoutSessionId} />
          )}
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(CheckoutPage), { ssr: false });
