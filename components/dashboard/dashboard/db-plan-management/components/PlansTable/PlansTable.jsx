import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import TablePagination from '@/components/dashboard/dashboard/common/table/TablePagination';

export default function PlanTables({ data }) {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
    page: 0,
    total: data?.length || 0,
  });

  const table = useReactTable({
    columns: getColumns(),
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    table.setPagination({
      pageIndex: pagination.page,
      pageSize: pagination.limit,
    });
  }, [pagination]);

  return (
    <>
      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <table className="table-2 col-12 text-nowrap mt-10">
          <tbody>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    className="text-primary"
                    width={header.getSize()}
                    key={header.id}
                    style={{
                      textAlign: header.column.columnDef.meta?.headerAlign,
                    }}
                  >
                    {header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.map((row, index) => (
              <tr key={index}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    width={cell.column.getSize()}
                    key={cellIndex}
                    align={cell.column.columnDef.meta?.align}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        pagination={{
          ...pagination,
          total: data?.length,
        }}
        setPagination={setPagination}
      />
    </>
  );
}
