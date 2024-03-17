'use client';

import useTrans from '@/hooks/useTrans';
import { useRouter } from 'next/navigation';
import DowngradePlanModal from '../DowngradePlanModal';
import CancelPlanModal from '../CancelPlanModal';
import useUserPlans from '@/hooks/useUserPlans';
import { useQuery } from '@tanstack/react-query';

export default function DowngradePlanCard() {
  const router = useRouter();
  const { getCurrentPlan } = useUserPlans();
  const { t, isReverse } = useTrans();

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchCurrentPlan'],
    queryFn: () => getCurrentPlan(),
  });

  const onUpgrade = () => {
    router.push('/pricing');
  };

  const renderUpgrade = () => {
    if (data?.label === 'Advanced') return null;
    return (
      <button
        onClick={onUpgrade}
        type="button"
        className="d-flex btn btn-success"
      >
        <i
          className={`bi bi-chevron-double-up ${isReverse ? 'ml-10' : 'mr-10'}`}
        ></i>{' '}
        {t('Billing.upgradeBtn')}
      </button>
    );
  };

  const renderDowngrade = () => {
    if (data?.label !== 'Advanced') return null;
    return (
      <button
        type="button"
        className="d-flex btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#downgradePlanModalBilling"
      >
        <i
          className={`bi bi-chevron-double-down ${
            isReverse ? 'ml-10' : 'mr-10'
          }`}
        ></i>{' '}
        {t('Billing.downgradeBtn')}
      </button>
    );
  };

  const renderCancel = () => {
    if (data?.label !== 'Advanced' && data?.label !== 'Standard') return null;
    return (
      <button
        type="button"
        className="d-flex btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#cancelPlanModalBilling"
      >
        <i className={`bi bi-x-circle ${isReverse ? 'ml-10' : 'mr-10'}`}></i>{' '}
        {t('Billing.cancleBtn')}
      </button>
    );
  };

  return (
    <>
      <div
        className="py-30 px-30 rounded-4 bg-white shadow-3"
        dir={`${isReverse && 'rtl'}`}
        style={{ minHeight: '196px' }}
      >
        <div className="row y-gap-20 justify-between items-center">
          <div className="d-grid gap-2 d-flex flex-column">
            {renderUpgrade()}
            {renderDowngrade()}
            {renderCancel()}
          </div>
        </div>
      </div>
      <DowngradePlanModal />
      <CancelPlanModal />
    </>
  );
}
