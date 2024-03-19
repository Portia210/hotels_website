'use client';

import useUserPlans from '@/hooks/useUserPlans';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function RevertCancelModal({ planStatus }) {
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

  if (isLoading) return null;

  return (
    <div
      className="modal fade"
      id="revertCancelModalBilling"
      tabIndex="-1"
      aria-labelledby="revertCancelModalBillingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-6" id="revertCancelModalBillingLabel">
              Are you sure you want to revert the {planStatus} action?
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
              Your plan will be back to <strong>{data?.label}</strong>. <br />
              This change will take effect inmediately.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              disabled={revertMutation.isPending}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              onClick={() => revertMutation.mutate()}
              disabled={revertMutation.isPending}
              type="button"
              className="btn btn-primary"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
