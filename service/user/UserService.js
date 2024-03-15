import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';
import pickBy from 'lodash/pickBy';

class UserService {
  constructor() {}

  async fetchUserList(params, token) {
    params = pickBy(params, value => value !== 'null' && value !== '');
    let url = `${TOURCOMPARE_BE_URL}/api/v1/users/list`;
    if (params) {
      url = `${url}?${new URLSearchParams(params).toString()}`;
    }
    const response = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(res => res.data);
    return response;
  }
}
const userService = new UserService();
export default userService;