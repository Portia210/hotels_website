import Pagination from '@/components/dashboard/dashboard/db-dashboard/components/RecentShortenLinks/Pagination';
import useGetFetchQuery from '@/hooks/useGetFetchQuery';
import eventEmitter from '@/utils/eventEmitter';
import { useEffect, useState } from 'react';

export default function TablePagination() {
  const userPagination = useGetFetchQuery(['fetchUsers']);

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
    total: userPagination?.total || 1,
  });

  const handlePageChange = page => {
    setPagination(prev => ({ ...prev, skip: page * prev.limit }));
  };

  useEffect(() => {
    eventEmitter.emit('paginationUpdate', pagination);
  }, [pagination.skip]);

  useEffect(() => {
    console.log('userPagination', userPagination);
  }, [userPagination]);

  return (
    <>
      <Pagination pagination={pagination} onChangePage={handlePageChange} />
    </>
  );
}
