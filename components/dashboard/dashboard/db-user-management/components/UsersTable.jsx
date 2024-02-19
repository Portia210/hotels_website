import useUsers from "@/hooks/useUsers";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { columns } from "./UsersTable/columns";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const { fetchUsers } = useUsers();
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: () => fetchUsers(),
  });

  useEffect(() => {
    console.log(data);
    if (data) setUsers(data.results);
  }, [data]);

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <table className="col-12">
        <tbody>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="th"
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
