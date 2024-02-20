import { useQueryClient } from "@tanstack/react-query";

const useGetFetchQuery = (key) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(key);
};

export default useGetFetchQuery;
