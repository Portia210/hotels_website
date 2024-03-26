import managePlanService from '@/service/plans/ManagePlanService';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AddUpdateFeatureForm from './AddUpdateFeatureForm';
import usePlanManageStore from '@/store/usePlanManageStore';

export default function AddFeatureModal() {
  const { selectedPlan } = usePlanManageStore();
  const { getToken } = useAuth();
  const [feature, setFeature] = useState({});

  const planMutation = useMutation({
    mutationFn: async () => {
      return managePlanService.createFeature(
        selectedPlan._id,
        feature,
        await getToken(),
      );
    },
    onSuccess: () => {
      document.getElementById('addFeatureModalDismiss').click();
      toast.success('Feature added successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    },
    onError: error => {
      console.error(`Error while adding feature`, error);
      toast.error('An error occurred', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    },
  });

  const onSubmit = () => {
    planMutation.mutate();
  };

  return (
    <div
      className="modal fade"
      id="featurePlanModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="featurePlanModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="featurePlanModalLabel">
              Add Feature
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <AddUpdateFeatureForm feature={feature} setFeature={setFeature} />
          </div>
          <div className="modal-footer">
            <button
              id="addFeatureModalDismiss"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              disabled={planMutation.isPending}
              onClick={() => onSubmit()}
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