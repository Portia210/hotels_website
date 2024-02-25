import LocationTopBar from "@/components/common/LocationTopBar";
import DefaultFooter from "@/components/footer/default";
import DefaultHeader from "@/components/header/default-header";
import Hotels from "@/components/hotels/Hotels2";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata = {
  title: "Destinations || Agent-Space - Travel & Tour React NextJS Template",
  description: "Agent-Space - Travel & Tour React NextJS Template",
};

const Destinations = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <LocationTopBar />
      {/* End location top bar section */}

      {/* End Top Banner,categorie,intro,weather, generic info section */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Recommended Hotels</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                href="#"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
            <Hotels />
          </div>
          {/* End relative */}
        </div>
      </section>
      {/* End  Hotel sections */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Destinations), { ssr: false });
