'use client';

import useCheckout from '@/hooks/useCheckout';
import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import CancelPlanModal from '../CancelPlanModal';
import DowngradePlanModal from '../DowngradePlanModal';

export default function DowngradePlanCard() {
  const router = useRouter();
  const { getCurrentPlan, getPlanByLabel } = useUserPlans();
  const { createCheckoutSession } = useCheckout();
  const { t, isReverse } = useTrans();

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchCurrentPlan'],
    queryFn: () => getCurrentPlan(),
  });

  const upgradeMutation = useMutation({
    mutationFn: async () => {
      const plan = await getPlanByLabel('Advanced')
      const checkoutSessionId = await createCheckoutSession(plan._id)
      return { plan, checkoutSessionId }
    },
    onSuccess: async data => {
      const planId = data?.plan?._id;
      const checkoutSessionId = data?.checkoutSessionId;
      router.push(`/checkout/${planId}?checkoutSessionId=${checkoutSessionId}&type=upgrade`);
    },
  });

  const onUpgrade = async () => {
    if (upgradeMutation.isPending) return;
    upgradeMutation.mutate();
  };

  const renderUpgrade = () => {
    if (!data?.label || data?.label === 'Advanced') return null;
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
