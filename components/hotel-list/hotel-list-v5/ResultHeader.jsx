export default function ResultHeader({ loading, totalResult }) {
  return (
    <>
      {loading && (
        <div className="d-flex align-items-center x-gap-10">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3>Loading</h3>
        </div>
      )}
      {!loading && totalResult === 0 && <h3>No hotels found</h3>}
      {!loading && totalResult > 0 && (
        <h3 className="text-24 fw-600 text-dark-1">
          {totalResult} Hotels found
        </h3>
      )}
    </>
  );
}
