'use client';

import useTrans from '@/hooks/useTrans';
import { useRouter } from 'next/navigation';
import DowngradePlanModal from '../DowngradePlanModal';
import CancelPlanModal from '../CancelPlanModal';

export default function DowngradePlanCard() {
  const router = useRouter();
  const { t, isReverse } = useTrans();

  const onUpgrade = () => {
    router.push('/pricing');
  };

  const onDowngrade = () => {
    console.log('Downgrade Plan');
  };

  const onCancel = () => {
    console.log('Cancel Plan');
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
            <button
              onClick={onUpgrade}
              type="button"
              className="d-flex btn btn-success"
            >
              <i className="bi bi-chevron-double-up mr-10"></i> Upgrade Plan
            </button>
            <button
              onClick={onDowngrade}
              type="button"
              className="d-flex btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#downgradePlanModalBilling"
            >
              <i className="bi bi-chevron-double-down mr-10"></i> Downgrade Plan
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="d-flex btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#cancelPlanModalBilling"
            >
              <i className="bi bi-x-circle mr-10"></i> Cancel Plan
            </button>
          </div>
        </div>
      </div>
      <DowngradePlanModal />
      <CancelPlanModal />
    </>
  );
}
