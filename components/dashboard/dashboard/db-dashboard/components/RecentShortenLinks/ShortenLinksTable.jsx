import useShortenLink from "@/hooks/useShortenLink";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

export default function ShortenLinksTable() {
  const [links, setLinks] = useState([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 20,
    total: 0,
  });

  const { getShortenLinks } = useShortenLink();

  const { data, isLoading, error, refetch } = useQuery({
    enabled: false,
    queryKey: ["fetchLinks"],
    queryFn: () => getShortenLinks(pagination.skip, pagination.limit),
  });

  const onChangePage = (page) => {
    setPagination((prev) => ({ ...prev, skip: page * prev.limit }));
  };

  useEffect(() => {
    refetch({ skip: pagination.skip, limit: pagination.limit });
  }, [pagination.skip]);

  useEffect(() => {
    if (data) {
      setLinks(data.data);
      setPagination({
        skip: data.skip,
        limit: data.limit,
        total: data.total,
      });
    }
  }, [data]);

  return (
    <>
      <table className="table-2 col-12">
        <thead>
          <tr>
            <th>#</th>
            <th>Short Link</th>
            <th>Long Link</th>
            <th>Status</th>
            <th className="text-center">Clicks Number</th>
            <th className="text-center">Created At</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(links) &&
            links.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row?.link}</td>
                <td className="fw-500 text-truncate">
                  <input value={row.target} type="textarea" readOnly />
                </td>
                <td>{row.banned ? "Deactive" : "Active"}</td>
                <td>
                  <div
                    className={`rounded-100 py-4 text-center col-12 text-14 fw-500`}
                  >
                    {row?.visit_count}
                  </div>
                </td>
                <td>{dayjs(row?.created_at).format("DD/MM/YYYY HH:mm")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} onChangePage={onChangePage} />
    </>
  );
}
