import Header from '@/components/header/dashboard-header';
import useTransServer from '@/hooks/useTransServer';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import DashboardCard from './components/DashboardCard';
import RercentShortenLinks from './components/RecentShortenLinks/RercentShortenLinks';

const index = () => {
  const { t, isReverse } = useTransServer();

  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main" dir={`${isReverse && 'rtl'}`}>
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">
                  {t('Dashboard.Sidebar.dashboard')}
                </h1>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <DashboardCard />

            <div className="row y-gap-30 pt-20 chart_responsive">
              <div className="col-12">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500">
                      {t('DashboardCard.ShortLink.recent')}
                    </h2>
                  </div>
                  {/* End d-flex */}

                  <RercentShortenLinks />
                </div>
                {/* End py-30 */}
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default index;
