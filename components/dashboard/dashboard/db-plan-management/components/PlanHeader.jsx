import usePlanManageStore from '@/store/usePlanManageStore';
import AddPlanModal from './AddPlanModal';
import DeletePlanModal from './DeletePlanModal';

export default function PlanHeader() {
  const { setAction, selectedPlan } = usePlanManageStore();
  return (
    <>
      <div className="row y-gap-20">
        <div className="col-12"></div>
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <button
              onClick={() => setAction('CREATE')}
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createPlanModal"
            >
              Add Plan
            </button>
          </div>
        </div>
      </div>
      <AddPlanModal />
      <DeletePlanModal selectedPlan={selectedPlan}/>
    </>
  );
}
