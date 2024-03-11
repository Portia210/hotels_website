'use client';

export default function CancelPlanModal() {
  const onCancel = () => {
    
  };

  return (
    <div
      className="modal fade"
      id="cancelPlanModalBilling"
      tabIndex="-1"
      aria-labelledby="cancelPlanModalBillingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="cancelPlanModalBillingLabel">
              Are you sure you want to downgrade your plan?
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
              Your plan is scheduled to be canceled. <br/>
              This change will take effect in the next billing cycle.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              onClick={() => onCancel()}
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
