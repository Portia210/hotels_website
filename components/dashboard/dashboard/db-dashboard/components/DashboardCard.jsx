'use client';
import CreditCard from './DashboardCard/CreditCard';
import PlanCard from './DashboardCard/PlanCard';
import ShortLinkCard from './DashboardCard/ShortLinkCard';
import ShortLinkOverviewCard from './DashboardCard/ShortLinkOverviewCard';

const DashboardCard = () => {
  return (
    <div className="row y-gap-30">
      <div className="col-xl-3 col-md-6">
        <PlanCard />
      </div>
      <div className="col-xl-3 col-md-6">
        <CreditCard />
      </div>
      <div className="col-xl-3 col-md-6">
        <ShortLinkCard />
      </div>
      <div className="col-xl-3 col-md-6">
        <ShortLinkOverviewCard />
      </div>
    </div>
  );
};

export default DashboardCard;
