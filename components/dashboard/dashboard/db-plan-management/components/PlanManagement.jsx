'use client';

import subscriptionPlanService from '@/service/plans/SubscriptionPlanService';
import PlanTables from './PlansTable/PlansTable';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import PlanHeader from './PlanHeader';

const PlanManagement = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchPlans'],
    queryFn: () => subscriptionPlanService.fetchPlans(),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="row y-gap-20">
      <PlanHeader />
      <PlanTables data={data} />
    </div>
  );
};

export default PlanManagement;
