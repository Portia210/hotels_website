import useUsers from '@/hooks/useUsers';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserPlansDropdown from './UserPlansDropdown';
import UserStatusDropdown from './UserStatusDropdown';

export default function UserTableFilter({ setData }) {
  const { fetchUsers } = useUsers();
  const [isReset, setIsReset] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    plan: '',
    agentNumber: '',
    status: '',
  });
  const { email, plan, agentNumber, status } = formValues;
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: () =>
      fetchUsers({
        email,
        plan,
        agentNumber,
        status,
      }),
  });

  const onSearch = async () => {
    await refetch();
  };

  const onReset = async () => {
    setFormValues({
      email: '',
      plan: '',
      agentNumber: '',
      status: '',
    });
    setIsReset(true);
  };

  useEffect(() => {
    if (!isReset) return;
    setIsReset(false);
    refetch();
  }, [isReset]);

  useEffect(() => {
    if (data) setData(data);
  }, [data]);

  return (
    <div className="row x-gap-20 y-gap-20">
      <div className="form-input col-sm-12 col-md-4">
        <label className="lh-1 text-16">Email</label>
        <input
          type="email"
          value={email}
          onChange={e =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
      </div>
      <div className="form-input col-sm-12 col-md-4">
        <label className="lh-1 text-16">Plan</label>
        <UserPlansDropdown
          value={plan}
          onChange={value => setFormValues({ ...formValues, plan: value })}
        />
      </div>
      <div className="form-input col-sm-12 col-md-4">
        <label className="lh-1 text-16">Status</label>
        <UserStatusDropdown
          value={status}
          onChange={value => setFormValues({ ...formValues, status: value })}
        />
      </div>
      <div className="form-input col-sm-12 col-md-4">
        <label className="lh-1 text-16">Agent Number</label>
        <input
          type="text"
          value={agentNumber}
          onChange={e =>
            setFormValues({ ...formValues, agentNumber: e.target.value })
          }
        />
      </div>
      <div className="col-12">
        <div className="d-flex">
          <button
            disabled={isLoading}
            onClick={onSearch}
            className="button px-10 h-40 -dark-1 bg-blue-1 text-white mr-10"
          >
            Search <div className="icon-search text-20 ml-10"></div>
          </button>
          <button
            disabled={isLoading}
            onClick={onReset}
            className="button px-10 h-40 -dark-1 bg-blue-1 text-white"
          >
            Reset <div className="bi bi-arrow-clockwise text-20 ml-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
