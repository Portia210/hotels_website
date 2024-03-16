import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

const useInvoice = () => {
  const { getToken } = useAuth();

  const getInvoice = async id => {
    if (!id) throw Error('Billing history id is required');
    const token = await getToken();
    const response = await axios
      .get(
        `${TOURCOMPARE_BE_URL}/api/v1/billing/invoice?billingHistoryId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then(rs => rs.data);
    return response;
  };

  return {
    getInvoice,
  };
};

export default useInvoice;
