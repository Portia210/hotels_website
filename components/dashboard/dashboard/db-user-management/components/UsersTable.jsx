import useGetFetchQuery from '@/hooks/useGetFetchQuery';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import UserTableFilter from './UsersTable/UserTableFilter';
import { columns } from './UsersTable/columns';
import { useState } from 'react';

export default function UsersTable() {
  const [data, setData] = useState([])

  const table = useReactTable({
    columns,
    data: data?.results || [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <UserTableFilter setData={setData}/>
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
  );
}
