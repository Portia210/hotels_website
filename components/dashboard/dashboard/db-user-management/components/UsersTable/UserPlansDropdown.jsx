import useUserPlans from '@/hooks/useUserPlans';
import useUserPlanStore from '@/store/useUserPlansStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function UserPlansDropdown({ value, onChange }) {
  const userPlanStore = useUserPlanStore();
  const { fetchPlans } = useUserPlans();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fetchPlans'],
    queryFn: () => fetchPlans(),
  });

  useEffect(() => {
    if (data) userPlanStore.setPlans(data);
  }, [data]);

  return (
    <select
      className="form-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>
        Plans
      </option>
      {data?.map(plan => (
        <option key={plan._id} value={plan._id}>
          {plan.label}
        </option>
      ))}
    </select>
  );
}
