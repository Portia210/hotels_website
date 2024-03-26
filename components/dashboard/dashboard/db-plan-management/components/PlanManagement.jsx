'use client';

import subscriptionPlanService from '@/service/plans/SubscriptionPlanService';
import PlanTables from './PlansTable/PlansTable';
import { useQuery } from '@tanstack/react-query';
import PlanHeader from './PlanHeader';

const PlanManagement = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchPlans'],
    queryFn: () => subscriptionPlanService.fetchPlans(),
  });

  return (
    <div className="row y-gap-20">
      <PlanHeader />
      <PlanTables data={data} />
    </div>
  );
};

export default PlanManagement;
