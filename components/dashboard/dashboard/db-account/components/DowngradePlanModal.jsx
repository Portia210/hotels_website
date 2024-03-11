'use client';

export default function DowngradePlanModal() {
  const onDowngrade = () => {};

  return (
    <div
      className="modal fade"
      id="downgradePlanModalBilling"
      tabIndex="-1"
      aria-labelledby="downgradePlanModalBillingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id="downgradePlanModalBillingLabel"
            >
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
              Your new plan will be <strong>Standard.</strong> <br />
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
              onClick={() => onDowngrade()}
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
