'use client';

import subscriptionPlanService from '@/service/plans/SubscriptionPlanService';
import PlanTables from './PlansTable/PlansTable';
import { useQuery } from '@tanstack/react-query';
import PlanHeader from './PlanHeader';
import { useEffect } from 'react'

const PlanManagement = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fetchPlans'],
    queryFn: () => subscriptionPlanService.fetchPlans(),
  });

  const subscribe = () => {
    const token = eventEmitter.addListener('planUpdated', value => {
      refetch()
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return (
    <div className="row y-gap-20">
      <PlanHeader />
      <PlanTables data={data} />
    </div>
  );
};

export default PlanManagement;
