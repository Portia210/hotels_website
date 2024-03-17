'use client';

import useTrans from '@/hooks/useTrans';
import useUserCredit from '@/hooks/useUserCredit';
import useUserPlans from '@/hooks/useUserPlans';
import { useQuery } from '@tanstack/react-query';

export default function PlanCard() {
  const { t, isReverse } = useTrans();
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
    refetchInterval: 4000,
  });

  const getPlanLabel = plan => {
    return t(`DashboardCard.Plan.${plan?.toLowerCase()}`) || plan;
  };

  const item = {
    title: t('DashboardCard.Plan.title'),
    label: getPlanLabel(planData?.label),
    description: `${data?.total || 0} ${t(
      'DashboardCard.Plan.searchesPerday',
    )}`,
    icon: <i className="bi bi-box"></i>,
  };

  return (
    <div
      className="py-30 px-30 rounded-4 bg-white shadow-3"
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-lg-12 col-md-auto text-nowrap">
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
