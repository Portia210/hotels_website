import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import pickBy from 'lodash/pickBy';

const useUsers = () => {
  const { getToken } = useAuth();

  const fetchUsers = async params => {
    params = pickBy(params, value => value !== 'null' && value !== '');
    let url = `${TOURCOMPARE_BE_URL}/api/v1/users/list`;
    if (params) {
      url = `${url}?${new URLSearchParams(params).toString()}`;
    }
    const token = await getToken();
    const response = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(res => res.data);
    return response;
  };

  return {
    fetchUsers,
  };
};

export default useUsers;
