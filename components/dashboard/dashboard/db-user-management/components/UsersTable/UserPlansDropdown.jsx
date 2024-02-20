import useUserPlans from '@/hooks/useUserPlans';
import { useQuery } from '@tanstack/react-query';

export default function UserPlansDropdown({ value, onChange }) {
  const { fetchPlans } = useUserPlans();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fetchPlans'],
    queryFn: () => fetchPlans(),
  });

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
        <option key={plan.name} value={plan.name}>
          {plan.name}
        </option>
      ))}
    </select>
  );
}
