'use client';

export default function DowngradeModal() {
  return (
    <div
      className="modal fade"
      id="downgradePlanModal"
      tabIndex="-1"
      aria-labelledby="downgradePlanModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="downgradePlanModalLabel">
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
              In order to downgrade your plan, goto the billing page in your
              Dashboard
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
              onClick={() => window.location.href = '/dashboard/db-account'}
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
