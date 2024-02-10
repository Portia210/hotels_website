import TransConfig from "@/components/config/TransConfig";
import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/header-1";
import Hero1 from "@/components/hero/hero-1";
import DestinationGallery from "@/components/home/home-1/DestinationGallery";
import Destinations from "@/components/home/home-1/Destinations/Destinations";
import { useMessages } from "next-intl";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Home-1 || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const Home_1 = () => {
  const messages = useMessages();

  return (
    <>
      <TransConfig messages={messages} />
      {/* End Page Title */}

      <Header1 />
      {/* End Header 1 */}

      <Hero1 />
      {/* End Hero 1 */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md" dir="">
                <h2 className="sectionTitle__title">Destinations we love</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="tabs -pills pt-40 js-tabs">
            <Destinations />
          </div>
          {/* End tabs */}
        </div>
      </section>
      {/* End Destination we love Section */}

      <DestinationGallery />
      {/* End Destination Gallery Section */}

      {/* Start Footer Section */}
      <DefaultFooter />
      {/* End Footer Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Home_1), { ssr: false });
