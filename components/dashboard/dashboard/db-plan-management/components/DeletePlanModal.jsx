import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import managePlanService from '@/service/plans/ManagePlanService';

export default function DeletePlanModal({ selectedPlan }) {
  const { getToken } = useAuth();

  const planMutation = useMutation({
    mutationFn: async () => {
      return managePlanService.deletePlan(selectedPlan?._id, await getToken());
    },
    onSuccess: () => {
      document.getElementById('deletePlanModalDismiss').click();
      toast.success('Plan delete successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    },
    onError: (error) => {
      document.getElementById('deletePlanModalDismiss').click();
      console.error(`Error while delete plan`, error)
      toast.error('An error occurred', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    },
  });

  const onDelete = () => {
    planMutation.mutate()
  };

  return (
    <div
      className="modal fade"
      id="deletePlanModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="deletePlanModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deletePlanModalLabel">
              Delete Plan
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this plan?
          </div>
          <div className="modal-footer">
            <button
              id="deletePlanModalDismiss"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button disabled={planMutation.isPending} onClick={() => onDelete()} type="button" className="btn btn-danger">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
