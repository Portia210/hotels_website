import usePlanManageStore from '@/store/usePlanManageStore';

export default function TableActions({ row }) {
  const { setAction, setSelectedPlan } = usePlanManageStore();

  return (
    <div className="d-flex justify-content-center">
      <button
        onClick={() => {
          setSelectedPlan(row);
          setAction('UPDATE');
        }}
        className="mr-10"
        data-bs-toggle="modal"
        data-bs-target="#createPlanModal"
      >
        <i className="bi bi-pencil-square text-16 text-primary"></i>
      </button>
      <button
        onClick={() => {
          setSelectedPlan(row);
          setAction('DELETE');
        }}
        data-bs-toggle="modal"
        data-bs-target="#deletePlanModal"
      >
        <i className="bi bi-trash2 text-16 text-danger"></i>
      </button>
    </div>
  );
}
