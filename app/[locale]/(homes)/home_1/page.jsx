import TransConfig from '@/components/config/TransConfig';
import DefaultFooter from '@/components/footer/default';
import Header1 from '@/components/header/header-1';
import Hero1 from '@/components/hero/hero-1';
import DestinationGallery from '@/components/home/home-1/DestinationGallery';
import Destinations from '@/components/home/home-1/Destinations/Destinations';
import TouristAttractionGallery from '@/components/home/home-1/TouristAttractionGallery';
import useTransServer from '@/hooks/useTransServer';
import { auth } from '@clerk/nextjs';
import { useMessages } from 'next-intl';

export const metadata = {
  title: 'Home || Agent-Space - Travel & Tour React NextJS Template',
  description: 'Agent-Space - Travel & Tour React NextJS Template',
};

export default function Home() {
  const { userId } = auth();
  const messages = useMessages();
  const { t, isReverse } = useTransServer();

  return (
    <>
      <TransConfig messages={messages} />
      {/* End Page Title */}

      <Header1 />
      {/* End Header 1 */}

      <Hero1 />
      {/* End Hero 1 */}

      {userId && (
        <section className="layout-pt-md layout-pb-lg">
          <div className="container">
            <div className={`d-flex ${isReverse && 'justify-content-end'}`}>
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  {t('DestinationWeLove.title')}
                </h2>
              </div>
            </div>
            {/* End .row */}

            <div
              className="tabs -pills pt-40 js-tabs"
              id="destinationsWeLove"
              style={{
                scrollMarginTop: '180px',
              }}
            >
              <Destinations />
            </div>
            {/* End tabs */}
          </div>
        </section>
      )}

      {/* End Destination we love Section */}

      <DestinationGallery />
      {/* End Destination Gallery Section */}

      <TouristAttractionGallery />
      {/* End TouristAttraction Gallery Section */}

      {/* Start Footer Section */}
      <DefaultFooter />
      {/* End Footer Section */}
    </>
  );
}
