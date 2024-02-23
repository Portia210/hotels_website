import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';

const useSignUpForm = () => {
  const checkAgentNumber = async agentNumber => {
    if (!agentNumber) return true;
    return await axios
      .get(
        `${TOURCOMPARE_BE_URL}/api/v1/users/agent-number?agentNumber=${agentNumber}`,
      )
      .then(res => res.data);
  };
  return { checkAgentNumber };
};
export default useSignUpForm;
