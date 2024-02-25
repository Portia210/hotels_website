import DefaultFooter from "@/components/footer/default";
import DefaultHeader from "@/components/header/default-header";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Terms & Conditions || Agent-Space - Travel & Tour React NextJS Template",
  description: "Agent-Space - Travel & Tour React NextJS Template",
};

const Terms = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      {/* End terms section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Terms), { ssr: false });
