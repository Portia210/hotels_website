import TransConfig from '@/components/config/TransConfig';
import DefaultFooter from '@/components/footer/default';
import Header1 from '@/components/header/header-1';
import { useTranslations } from 'next-intl';
import { useMessages } from 'next-intl';

export async function generateMetadata() {
  return { title: 'GoTrip: Hotel List' };
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
                <h1 className="text-30 fw-600 text-white mb-50">
                  Find Your Dream Luxury Hotel
                </h1>
              </div>
              {/* End text-center */}
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center">
            <div className="border-top-light mt-30 mb-30"></div>
            {/* End border-top */}
            <div className="row y-gap-30 sm:pr-0">
              <span className="text-20">
                {t('NoPlan.part1')}{' '}
                <a href="/pricing" className="text-decoration-underline">
                  {t('NoPlan.part2')}
                </a>{' '}
                {t('NoPlan.part3')}{' '}
                <a href="/pricing" className="text-decoration-underline">
                  {t('NoPlan.part4')}
                </a>{' '}
                {t('NoPlan.part5')}
              </span>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      {/* End layout for listing sidebar and content */}

      <DefaultFooter />
    </>
  );
};

export default index;
