import TransConfig from '@/components/config/TransConfig';
import DefaultFooter from '@/components/footer/default';
import Header1 from '@/components/header/header-1';
import ListHotels from '@/components/hotel-list/hotel-list-v5/ListHotels';
import MainFilterSearchBox from '@/components/hotel-list/hotel-list-v5/MainFilterSearchBox';
import { useTranslations } from 'next-intl';
import { useMessages } from 'next-intl';

export async function generateMetadata({ searchParams }) {
  try {
    const { destination } = JSON.parse(searchParams?.destination || '{}');
    const title =
      `Agent-Space: Hotels in ${destination}` || 'Agent-Space: Hotel List';
    return { title };
  } catch (error) {
    console.error('Error when generateMetadata', error);
    return { title: 'Agent-Space: Hotel List' };
  }
}

const index = () => {
  const messages = useMessages();
  const t = useTranslations();
  return (
    <>
      <TransConfig messages={messages} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
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
                  {t('Hero.headLine2')}
                </h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <ul className="nav nav-pills mb-30">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="matchedHotels-tab"
                data-bs-toggle="pill"
                href="#matchedHotels"
              >
                Matches
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="restResults-tab"
                data-bs-toggle="pill"
                href="#restResults"
              >
                Rest of the results
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div id="matchedHotels" className="tab-pane fade show active">
              <ListHotels />
            </div>
            <div id="restResults" className="tab-pane fade">
              <h3>Menu 1</h3>
              <p>Some content in menu 1.</p>
            </div>
          </div>
        </div>
      </section>

      {/* End layout for listing sidebar and content */}

      <DefaultFooter />
    </>
  );
};

export default index;
