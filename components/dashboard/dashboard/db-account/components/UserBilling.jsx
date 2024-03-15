import PlanCard from '@/components/dashboard/dashboard/db-dashboard/components/DashboardCard/PlanCard';
import useTrans from '@/hooks/useTrans';
import useUserBilling from '@/hooks/useUserBilling';
import { useQuery } from '@tanstack/react-query';
import BillingCard from './BillingCard/BillingCard';
import DowngradePlanCard from './BillingCard/DowngradePlanCard';
import BillingTable from './BillingTable/BillingTable';
import { useState } from 'react';

const UserBilling = () => {
  const { t, isReverse } = useTrans();
  const { getUserBilling } = useUserBilling();
  const [showBillingCard, setShowBillingCard] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserBilling'],
    queryFn: () => getUserBilling(),
  });

  return (
    <div id="userBilling">
      <div className="row y-gap-30 mb-5">
        <div className="col-xl-3 col-md-6">
          <PlanCard />
        </div>
        {showBillingCard && (
          <div className="col-xl-5 col-md-6">
            <BillingCard setShowBillingCard={setShowBillingCard}/>
          </div>
        )}
        <div className="col-xl-4 col-md-12">
          <DowngradePlanCard />
        </div>
      </div>
      <BillingTable data={data} />
    </div>
  );
};

export default UserBilling;
