import managePlanService from '@/service/plans/ManagePlanService';
import usePlanManageStore from '@/store/usePlanManageStore';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import AddUpdatePlanForm from './AddUpdatePlanForm';
import eventEmitter from '@/utils/eventEmitter';

export default function AddPlanModal() {
  const { action, selectedPlan, setSelectedPlan } = usePlanManageStore();
  const { getToken } = useAuth();

  const planMutation = useMutation({
    mutationFn: async () => {
      selectedPlan.startDate = selectedPlan?.date?.startDate;
      selectedPlan.endDate = selectedPlan?.date?.endDate;

      if (action === 'UPDATE') {
        return managePlanService.updatePlan(selectedPlan, await getToken());
      }
      return managePlanService.createPlan(selectedPlan, await getToken());
    },
    onSuccess: () => {
      document.getElementById('addUpdatePlanModalDismiss').click();
      const message =
        action == 'CREATE'
          ? 'Plan created successfully'
          : 'Plan updated successfully';
      toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
      });
      eventEmitter.emit('planUpdated');
    },
    onError: () => {
      document.getElementById('addUpdatePlanModalDismiss').click();
      toast.error('An error occurred', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    },
  });

  const renderTitle = () => {
    if (action === 'UPDATE') {
      return (
        <h5 className="modal-title" id="createPlanModalLabel">
          Update Plan
        </h5>
      );
    } else if (action == null || action === 'CREATE') {
      return (
        <h5 className="modal-title" id="createPlanModalLabel">
          Create Plan
        </h5>
      );
    }
  };

  const onSubmit = () => {
    console.log('submitting');
    planMutation.mutate();
  };

  return (
    <div
      className="modal fade"
      id="createPlanModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="createPlanModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {renderTitle()}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body" key={action}>
            <AddUpdatePlanForm
              action={action}
              plan={selectedPlan}
              setPlan={setSelectedPlan}
            />
          </div>
          <div className="modal-footer">
            {action == 'UPDATE' && (
              <button
                id="addFeaturePlanModal"
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#featurePlanModal"
              >
                Update Features
              </button>
            )}
            <button
              id="addUpdatePlanModalDismiss"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => onSubmit()}
              disabled={planMutation.isPending}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
