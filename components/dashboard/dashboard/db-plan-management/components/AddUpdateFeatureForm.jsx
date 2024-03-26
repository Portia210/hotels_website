import managePlanService from '@/service/plans/ManagePlanService';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export default function AddUpdateFeatureForm({ currentFeatures, feature, setFeature }) {
  const { getToken } = useAuth();
  
  const { data, isLoading } = useQuery({
    queryKey: ['featureNameSuggestions'],
    queryFn: async () =>
      managePlanService.featureNameSuggestion(await getToken()),
  });

  const onFormChange = (key, value) => {
    setFeature({ ...feature, [key]: value });
  };

  const renderFeatureList = () => {
    return (
      <div>
        <label htmlFor="featureList" className="form-label">
          Plan's Features
        </label>
        <select
          className="form-select border"
          placeholder="Limit will be calculated in"
        >
          {currentFeatures?.map((feature, index) => (
            <option key={index} value={feature?.name}>
              {feature.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderFeatureNameOptions = () => {
    return (
      <div>
        <label htmlFor="name" className="form-label">
          New Feature
        </label>
        <select
          className="form-select border"
          disabled={isLoading}
          id="unit"
          value={feature?.unit}
          placeholder="Limit will be calculated in"
          onChange={e => onFormChange('unit', e.target.value)}
        >
          {data?.map((feature, index) => (
            <option key={index} value={feature?.name}>
              {feature.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="row">
      <div>{renderFeatureList()}</div>
      <div>{renderFeatureNameOptions()}</div>
      <div>
        <label htmlFor="limit" className="form-label">
          Limit
        </label>
        <input
          type="number"
          min={-1}
          className="form-control border"
          id="limit"
          placeholder="Enter Feature Limit"
          value={feature?.limit}
          onChange={e => onFormChange('limit', parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="unit" className="form-label">
          Unit
        </label>
        <select
          className="form-select border"
          id="unit"
          value={feature?.unit}
          placeholder="Limit will be calculated in"
          onChange={e => onFormChange('unit', e.target.value)}
        >
          <option value="days">Day</option>
          <option value="month">Month</option>
        </select>
      </div>
    </div>
  );
}
