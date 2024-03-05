import PlanCard from '@/components/dashboard/dashboard/db-dashboard/components/DashboardCard/PlanCard';
import useTrans from '@/hooks/useTrans';
import { useUser } from '@clerk/nextjs';
import BillingTable from './BillingTable/BillingTable';

const UserBilling = () => {
  const { t, isReverse } = useTrans();
  const { user } = useUser();

  return (
    <div>
      <div className="row y-gap-30">
        <div className="col-xl-3 col-md-6">
          <PlanCard />
        </div>
      </div>
      <BillingTable />
    </div>
  );
};

export default UserBilling;
