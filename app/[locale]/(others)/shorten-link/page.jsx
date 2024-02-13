import DefaultFooter from "@/components/footer/default";
import DefaultHeader from "@/components/header/default-header";
import ShortLinkInput from "@/components/shorten-link/ShortLinkInput";
import dynamic from "next/dynamic";

export const metadata = {
  title: "GoTrip: Shorten Your Links Easily!",
  description: "GoTrip - Travel & Tour",
};

const ShortenLink = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="d-flex justify-content-center">
            <ShortLinkInput />
          </div>
        </div>
      </section>

      <DefaultFooter />
    </>
  );
};
export default dynamic(() => Promise.resolve(ShortenLink), { ssr: false });
