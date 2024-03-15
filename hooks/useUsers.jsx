import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import userService from '@/service/user/UserService';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

const useUsers = () => {
  const { getToken } = useAuth();

  const fetchUsers = async params => {
    const token = await getToken();
    return await userService.fetchUserList(params, token);
  };

  const getUserById = async id => {
    if (!id) throw Error('User Id is required!');
    const url = `${TOURCOMPARE_BE_URL}/api/v1/users?id=${id}`;
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

  const updateUserStatus = async (userId, status) => {
    const token = await getToken();
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/users/update-status`,
        {
          userId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  const updateUserInfo = async userInfo => {
    if (!userInfo) throw Error('userInfo is required!');
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/users/manager-update-info`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  const updateUserRole = async (userId, role) => {
    if (!userId) throw Error('UserId is required!');
    if (!role) throw Error('Role is required!');
    const response = await axios
      .post(
        `${TOURCOMPARE_BE_URL}/api/v1/users/assign-role`,
        {
          userId,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          withCredentials: true,
        },
      )
      .then(res => res.data);
    return response;
  };

  return {
    fetchUsers,
    getUserById,
    updateUserStatus,
    updateUserInfo,
    updateUserRole,
  };
};

export default useUsers;
