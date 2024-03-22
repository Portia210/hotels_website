'use client';

import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';

export default function CancelPlanModal() {
  const { t, isReverse } = useTrans();
  const { cancelUserPlan } = useUserPlans();

  const onCancel = async () => {
    try {
      const res = await cancelUserPlan();
      console.log('res--->', res);
      window.location.reload();
    } catch (error) {
      console.log('error--->', error);
    }
  };

  return (
    <div
      className="modal fade"
      id="cancelPlanModalBilling"
      tabIndex="-1"
      aria-labelledby="cancelPlanModalBillingLabel"
      aria-hidden="true"
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="cancelPlanModalBillingLabel">
              {t('BillingModal.confirmCancel')}
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
              {t('BillingModal.alertCancel')} <br />
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
              onClick={() => onCancel()}
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
