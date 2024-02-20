import useGetFetchQuery from '@/hooks/useGetFetchQuery';
import { useEffect, useState } from 'react';

export default function UserTableFilter() {
  const users = useGetFetchQuery('fetchUsers');

  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');
  const [agentNumber, setAgentNumber] = useState('');
  const [status, setStatus] = useState('');

  const onSearch = async () => {
    // handle search logic here
    console.log('email', email);
    console.log('plan', plan);
    console.log('agentNumber', agentNumber);
    console.log('status', status);
  };

  useEffect(() => {
    console.log('users :::', users);
  }, []);

  return (
    <div className="row x-gap-20 y-gap-20">
      <div className="col-4 form-input">
        <label className="lh-1 text-16">Email</label>
        <input type="email" onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="col-4 form-input">
        <label className="lh-1 text-16">Plan</label>
        <input type="text" onChange={e => setPlan(e.target.value)} />
      </div>
      <div className="col-4 form-input">
        <label className="lh-1 text-16">Status</label>
        <input type="text" onChange={e => setStatus(e.target.value)} />
      </div>
      <div className="col-4 form-input">
        <label className="lh-1 text-16">Agent Number</label>
        <input type="text" onChange={e => setAgentNumber(e.target.value)} />
      </div>
      <div className="col-12">
        <div className="d-flex">
          <button
            onClick={onSearch}
            className="button px-10 h-40 -dark-1 bg-blue-1 text-white mr-10"
          >
            Search <div className="icon-search text-20 ml-10"></div>
          </button>
          <button
            onClick={onSearch}
            className="button px-10 h-40 -dark-1 bg-blue-1 text-white"
          >
            Reset <div className="bi bi-arrow-clockwise text-20 ml-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
