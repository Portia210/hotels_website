'use client';

import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function RevertCancelModal({ planStatus }) {
  const { t, isReverse } = useTrans();
  const { getCurrentPlan, revertCancelDowngrade } = useUserPlans();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getCurrentPlan'],
    queryFn: () => getCurrentPlan(),
  });

  const revertMutation = useMutation({
    mutationFn: () => revertCancelDowngrade(),
    onSuccess: () => {
      window.location.reload();
    },
  });

  const renderRevertPlan = () => {
    let text = t('BillingModal.confirmRevertCancel');
    if (planStatus === 'Downgrade') {
      text = t('BillingModal.confirmRevertDowngrade');
    }
    return text;
  };

  if (isLoading) return null;

  const renderBackPlan = () => {
    const text = t('BillingModal.backToPlan');
    const plan = t(`DashboardCard.Plan.${data?.label?.toLowerCase()}`);
    return text.replace('x', plan);
  };

  return (
    <div
      className="modal fade"
      id="revertCancelModalBilling"
      tabIndex="-1"
      aria-labelledby="revertCancelModalBillingLabel"
      aria-hidden="true"
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-6" id="revertCancelModalBillingLabel">
              {renderRevertPlan()}
            </h1>
            <button
              type="button"
              className="btn-close ml-5 mr-5"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              {renderBackPlan()} <br />
              {t('BillingModal.takeAffectionNow')}
            </p>
          </div>
          <div className="modal-footer" dir='ltr'>
            <button
              type="button"
              disabled={revertMutation.isPending}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t('Common.no')}
            </button>
            <button
              onClick={() => revertMutation.mutate()}
              disabled={revertMutation.isPending}
              type="button"
              className="btn btn-primary"
            >
              {t('Common.yes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
