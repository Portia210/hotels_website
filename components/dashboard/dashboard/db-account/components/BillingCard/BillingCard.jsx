'use client';

import useTrans from '@/hooks/useTrans';
import useUserBilling from '@/hooks/useUserBilling';
import useUserPlans from '@/hooks/useUserPlans';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default function BillingCard({ setShowBillingCard }) {
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
    const nextPlan =
      recurring?.nextMonthPlan?.label || recurring?.nextMonthPlan?.name;
    if (!nextPlan) return null;
    return (
      `${t('Billing.nextMonthPlan')}: ` +
      t(`DashboardCard.Plan.${nextPlan?.toLowerCase()}`)
    );
  };

  const item = {
    title: t('Billing.billingInfo'),
    nextMonthPlan: renderNextMonthPlan(),
    lastChargeDate: `${t('Billing.lastPaymentDate')}: ${dayjs(
      data?.recurring?.lastChargeDate,
    ).format('DD/MM/YYYY')}`,
    nextChargeDate: `${t('Billing.nextPaymentDate')}: ${dayjs(
      data?.recurring?.nextChargeDate,
    ).format('DD/MM/YYYY')}`,
    nextChargeAmount: `${t('Billing.nextChargeAmount')}: ${
      data?.recurring?.nextChargeAmount
    } ₪`,
    billingCycle: data?.billingCycle,
  };

  useEffect(() => {
    if (isLoading) return;
    if (!data?.billingCycle) {
      setShowBillingCard(false);
    } else {
      setShowBillingCard(true);
    }
  }, [data?.billingCycle, isLoading]);

  return (
    <div
      className="py-30 px-30 rounded-4 bg-white shadow-3"
      dir={`${isReverse && 'rtl'}`}
      style={{ minHeight: '196px' }}
    >
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-lg-12 col-md-auto text-nowrap ">
          <div className="fw-500 lh-14 text-primary">{item?.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5">{item?.nextMonthPlan}</div>
          <div className="text-16 lh-14 text-black mt-5">
            {`${t('Billing.billingCycle')}: `}{' '}
            <strong>{item?.billingCycle}</strong>
          </div>
          <div className="text-16 lh-14 text-black mt-5">
            {item?.lastChargeDate}
          </div>
          <div className="text-16 lh-14 text-black mt-5">
            {item?.nextChargeDate}
          </div>
          <div className="text-16 lh-14 text-black mt-5">
            {item?.nextChargeAmount}
          </div>
        </div>
      </div>
    </div>
  );
}
