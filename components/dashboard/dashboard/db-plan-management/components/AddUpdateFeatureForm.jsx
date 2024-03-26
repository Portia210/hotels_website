import managePlanService from '@/service/plans/ManagePlanService';
import subscriptionPlanService from '@/service/plans/SubscriptionPlanService';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import usePlanManageStore from '@/store/usePlanManageStore';
import { useEffect } from 'react';

export default function AddUpdateFeatureForm({ feature, setFeature }) {
  const { selectedPlan } = usePlanManageStore();
  const { getToken } = useAuth();

  const { data: currentPlan, refetch } = useQuery({
    queryKey: ['fetchPlanByLabel'],
    enabled: selectedPlan?.label !== null,
    queryFn: async () =>
      subscriptionPlanService.fetchPlanByLabel(selectedPlan?.label),
  });

  const {
    data,
    isLoading,
    refetch: suggestRefetch,
  } = useQuery({
    queryKey: ['featureNameSuggestions'],
    enabled: selectedPlan?.label !== null,
    queryFn: async () =>
      managePlanService.featureNameSuggestion(
        selectedPlan?.label,
        await getToken(),
      ),
  });

  const onFormChange = (key, value) => {
    setFeature({ ...feature, [key]: value });
  };

  useEffect(() => {
    if (selectedPlan) {
      refetch();
      suggestRefetch();
    }
  }, [selectedPlan]);

  useEffect(() => {});
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
          {currentPlan?.features?.map((feature, index) => (
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
          id="name"
          value={feature?.name || feature?.label}
          placeholder="Limit will be calculated in"
          onChange={e => onFormChange('name', e.target.value)}
        >
          <option value="" hidden>
            Select a feature
          </option>
          {data?.map((feature, index) => (
            <option key={index} value={feature?.name}>
              {feature?.name}
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
