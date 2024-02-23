import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import axios from 'axios';

const useSignUpForm = () => {
  const checkEmailAgentNumber = async (email, agentNumber) => {
    if (!agentNumber) return;
    const url = `${TOURCOMPARE_BE_URL}/api/v1/users/agent-number?agentNumber=${agentNumber}&email=${email}`;
    return await axios.get(url).then(res => res.data);
  };
  const checkAgentNumber = async (agentNumber) => {
    if (!agentNumber) return;
    const url = `${TOURCOMPARE_BE_URL}/api/v1/users/agent-number?agentNumber=${agentNumber}`;
    return await axios.get(url).then(res => res.data);
  };
  
  return { checkAgentNumber, checkEmailAgentNumber };
};
export default useSignUpForm;
