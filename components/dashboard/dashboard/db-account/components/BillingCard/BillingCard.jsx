'use client';

import useTrans from '@/hooks/useTrans';
import useUserBilling from '@/hooks/useUserBilling';
import useUserPlans from '@/hooks/useUserPlans';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export default function BillingCard() {
  const { t, isReverse } = useTrans();
  const { getCurrentPlan } = useUserPlans();
  const { getUserRecurringBilling } = useUserBilling();

  const { data: currentPlan, isLoading: isLoadingCurrentPlan } = useQuery({
    queryKey: ['getCurrentPlan'],
    queryFn: () => getCurrentPlan(),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserRecurringBilling'],
    queryFn: () => getUserRecurringBilling(),
  });

  const renderNextMonthPlan = () => {
    if (isLoadingCurrentPlan || isLoading) return null;
    const recurring = data?.recurring;
    if (currentPlan._id === recurring?.nextMonthPlan?._id) {
      return null;
    }
    return `Next Month Plan: ${
      recurring?.nextMonthPlan?.label || recurring?.nextMonthPlan?.name
    }`;
  };

  const item = {
    title: 'Billing Info',
    nextMonthPlan: renderNextMonthPlan(),
    lastChargeDate: `Last Payment Date: ${dayjs(
      data?.recurring?.lastChargeDate,
    ).format('DD/MM/YYYY')}`,
    nextChargeDate: `Next Payment Date: ${dayjs(
      data?.recurring?.nextChargeDate,
    ).format('DD/MM/YYYY')}`,
  };

  return (
    <div
      className="py-30 px-30 rounded-4 bg-white shadow-3"
      dir={`${isReverse && 'rtl'}`}
      style={{ minHeight: '196px' }}
    >
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-lg-12 col-md-auto text-nowrap ">
          <div className="fw-500 lh-14 text-primary">{item.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5" style={{ minHeight: 32 }}>
            {item.nextMonthPlan}{' '}
          </div>
          <div className="text-16 lh-14 text-black mt-5">
            {item.lastChargeDate}
          </div>
          <div className="text-16 lh-14 text-black mt-5">
            {item.nextChargeDate}
          </div>
        </div>
      </div>
    </div>
  );
}
