import NotFound from "@/components/common/NotFound";
import DefaultFooter from "@/components/footer/default";
import DefaultHeader from "@/components/header/default-header";
import dynamic from "next/dynamic";

export const metadata = {
  title: "404 || Agent-Space - Travel & Tour React NextJS Template",
  description: "Agent-Space - Travel & Tour React NextJS Template",
};

const index = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <NotFound />
      {/* End 404 section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
