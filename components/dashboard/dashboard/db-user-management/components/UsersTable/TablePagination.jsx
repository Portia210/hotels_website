import Pagination from '@/components/dashboard/dashboard/db-dashboard/components/RecentShortenLinks/Pagination';

export default function TablePagination({ pagination, setPagination }) {
  const handlePageChange = page => {
    setPagination(prev => ({ ...prev, page, skip: page * prev.limit }));
  };

  return (
    <>
      <Pagination pagination={pagination} onChangePage={handlePageChange} />
    </>
  );
}
