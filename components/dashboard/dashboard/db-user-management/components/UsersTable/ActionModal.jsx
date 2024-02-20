
export default function ActionModal({ id, title, body, onCancel, onConfirm }) {
  return (
    <div
      className="modal fade"
      id={`actionModal${id}`}
      aria-labelledby="actionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="text-start modal-title" id={`actionModalLabel${id}`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-start">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onCancel}
            >
              Close
            </button>
            <button
              onClick={onConfirm}
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
