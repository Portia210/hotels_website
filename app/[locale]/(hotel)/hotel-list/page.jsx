import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/header-1";
import ListHotels from "@/components/hotel-list/hotel-list-v5/ListHotels";
import MainFilterSearchBox from "@/components/hotel-list/hotel-list-v5/MainFilterSearchBox";
import { useMessages } from 'next-intl';

export const metadata = {
  title: "Hotel List v5 || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const index = () => {
  const messages = useMessages();

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 messages={messages}/>
      {/* End Header 1 */}

      <section className="section-bg pt-40 pb-40 relative z-5">
        <div className="section-bg__item col-12">
          <img
            src="/img/misc/bg-1.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* End .section-bg__item */}

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600 text-white">
                  Find Your Dream Luxury Hotel
                </h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox messages={messages}/>
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      <ListHotels />

      {/* End layout for listing sidebar and content */}

      <DefaultFooter />
    </>
  );
};

export default index;