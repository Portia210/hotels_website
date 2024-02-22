import DefaultFooter from "@/components/footer/default";
import DefaultHeader from "@/components/header/default-header";
import PricingSection from "@/components/pricing/PricingSection";
import dynamic from "next/dynamic";

export const metadata = {
  title: "GoTrip: Shorten Your Links Easily!",
  description:
    "Make your web links shorter and easier to share. It's simple, quick, and helps your messages look neat and elegant",
};

const PricingPage = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PricingSection />
            </div>
          </div>
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(PricingPage), { ssr: false });
