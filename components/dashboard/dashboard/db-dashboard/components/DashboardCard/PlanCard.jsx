'use client';

import useUserPlans from '@/hooks/useUserPlans';
import useUserCredit from '@/hooks/useUserCredit';
import { useQuery } from '@tanstack/react-query';

export default function PlanCard() {
  const { getUserRemainCredit } = useUserCredit();
  const { getCurrentPlan } = useUserPlans();

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchHotelSearchCredit'],
    queryFn: () => getUserRemainCredit('HOTEL_SEARCH'),
  });

  const {
    data: planData,
    isLoading: planLoading,
    error: planError,
  } = useQuery({
    queryKey: ['fetchCurrentPlan'],
    queryFn: () => getCurrentPlan(),
  });

  const item = {
    title: 'Your Plan',
    label: planData?.label || 'Standard',
    description: `${data?.total || 0} searches per day`,
    icon: <i className="bi bi-box"></i>,
  };

  return (
    <div className="py-30 px-30 rounded-4 bg-white shadow-3">
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-auto text-nowrap">
          <div className="fw-500 lh-14 text-primary">{item.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5">{item.label}</div>
          <div className="text-15 lh-14 text-light-1 mt-5">
            {item.description}
          </div>
        </div>
        <div className="col-auto text-primary lh-sm text-25">{item.icon}</div>
      </div>
    </div>
  );
}
