export default function AddUpdateFeatureForm({ feature, setFeature }) {
  
  const onFormChange = (key, value) => {
    setFeature({ ...plan, [key]: value });
  };

  return (
    <div className="row">
      <div>
        <label htmlFor="planName" className="form-label">
          Feature
        </label>
      </div>
      <div>
        <label htmlFor="limit" className="form-label">
          Limit
        </label>
        <input
          type="number"
          min={0}
          className="form-control border"
          id="limit"
          placeholder="Enter Feature Limit"
          value={plan?.position}
          onChange={e => onFormChange('limit', parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="unit" className="form-label">
          Unit
        </label>
        <input
          type="text"
          className="form-control border"
          id="unit"
          placeholder="Days / Months / Year"
          value={plan?.position}
          onChange={e => onFormChange('unit', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
