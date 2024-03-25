import AddUpdatePlanForm from './AddUpdatePlanForm';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import managePlanService from '@/service/plans/ManagePlanService';
import usePlanManageStore from '@/store/usePlanManageStore';
import { useAuth } from '@clerk/nextjs';

export default function AddPlanModal() {
  const { action, selectedPlan } = usePlanManageStore();
  const { getToken } = useAuth();

  const [plan, setPlan] = useState({});

  const { data: nameSuggests, isLoading: suggestLoading } = useQuery({
    queryKey: ['featureNameSuggestion'],
    queryFn: async () =>
      managePlanService.featureNameSuggestion(await getToken()),
  });

  const planMutation = useMutation({
    mutationFn: async () => {
      if (action === 'UPDATE') {
        return managePlanService.updatePlan(plan, await getToken());
      } else if (action == null || action === 'CREATE') {
        return managePlanService.createPlan(plan, await getToken());
      }
    },
    onSuccess: data => {
      console.log(data);
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
    console.log('plan', plan);
  };

  useEffect(() => {
    if (selectedPlan && action === 'UPDATE') {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

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
          <div className="modal-body">
            <AddUpdatePlanForm action={action} plan={plan} setPlan={setPlan} />
          </div>
          <div className="modal-footer">
            <button
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
