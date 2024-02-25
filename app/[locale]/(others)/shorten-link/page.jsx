import DefaultFooter from "@/components/footer/default";
import DefaultHeader from "@/components/header/default-header";
import ShortLinkInput from "@/components/shorten-link/ShortLinkInput";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Agent-Space: Shorten Your Links Easily!",
  description:
    "Make your web links shorter and easier to share. It's simple, quick, and helps your messages look neat and elegant",
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
        <div className="text-center mb-3 mb-md-5">
          <h2>
              Make your web links shorter and easier to share.
          </h2>
          <h4 className="sm:d-none lg:d-block">
            It's simple, quick, and helps your messages look neat and elegant
          </h4>
        </div>
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
