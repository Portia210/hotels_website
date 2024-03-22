'use client';

import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';

export default function DowngradePlanModal() {
  const { t, isReverse } = useTrans();
  const { downgradeUserPlan } = useUserPlans();

  const onDowngrade = async () => {
    try {
      const res = await downgradeUserPlan();
      console.log('res--->', res);
      window.location.reload();
    } catch (error) {
      console.log('error--->', error);
    }
  };

  const renderNewPlan = () => {
    const text = t('BillingModal.confirmDowngrade');
    const plan = t('DashboardCard.Plan.standard');
    return text.replace('x', plan);
  };

  return (
    <div
      className="modal fade"
      id="downgradePlanModalBilling"
      tabIndex="-1"
      aria-labelledby="downgradePlanModalBillingLabel"
      aria-hidden="true"
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id="downgradePlanModalBillingLabel"
            >
              {t('BillingModal.confirmDowngrade')}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              {renderNewPlan()}
              <br />
              {t('BillingModal.takeAffectionNextBill')}
            </p>
          </div>
          <div className="modal-footer" dir='ltr'>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t('Common.no')}
            </button>
            <button
              onClick={() => onDowngrade()}
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
