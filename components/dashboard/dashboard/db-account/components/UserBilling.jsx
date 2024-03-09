import PlanCard from '@/components/dashboard/dashboard/db-dashboard/components/DashboardCard/PlanCard';
import useTrans from '@/hooks/useTrans';
import useUserBilling from '@/hooks/useUserBilling';
import { useQuery } from '@tanstack/react-query';
import BillingCard from './BillingCard/BillingCard';
import BillingTable from './BillingTable/BillingTable';

const UserBilling = () => {
  const { t, isReverse } = useTrans();
  const { getUserBilling } = useUserBilling();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserBilling'],
    queryFn: () => getUserBilling(),
  });

  return (
    <div>
      <div className="row y-gap-30 mb-5">
        <div className="col-xl-3 col-md-6">
          <PlanCard />
        </div>
        <div className="col-xl-5 col-md-6">
          <BillingCard />
        </div>
      </div>
      <BillingTable data={data} />
    </div>
  );
};

export default UserBilling;
