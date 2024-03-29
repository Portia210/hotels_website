'use client';

import useTrans from '@/hooks/useTrans';
import useUserCredit from '@/hooks/useUserCredit';
import { useQuery } from '@tanstack/react-query';

export default function CreditCard() {
  const { t, isReverse } = useTrans();
  const { getUserRemainCredit } = useUserCredit();

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchHotelSearchCredit'],
    queryFn: () => getUserRemainCredit('HOTEL_SEARCH'),
    refetchInterval: 4000,
  });

  const count = Math.max(data?.total - data?.remaining, 0);

  const item = {
    title: t('DashboardCard.Credit.title'),
    amount: `${count} ${t('DashboardCard.Credit.count')}`,
    description: `${data?.remaining ?? 0} ${t('DashboardCard.Credit.remain')}`,
    icon: <i className="bi bi-search"></i>,
  };

  return (
    <div
      className="py-30 px-30 rounded-4 bg-white shadow-3"
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-lg-12 col-md-auto text-nowrap">
          <div className="fw-500 lh-14 text-primary">{item.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5" style={{ minHeight: 32 }}>
            {item.amount}
          </div>
          <div className="text-15 lh-14 text-light-1 mt-5">
            {item.description}
          </div>
        </div>
        <div className="col-auto text-primary lh-sm text-25">{item.icon}</div>
      </div>
    </div>
  );
}
