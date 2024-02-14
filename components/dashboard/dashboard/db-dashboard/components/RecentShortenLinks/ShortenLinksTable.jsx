import useShortenLink from "@/hooks/useShortenLink";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function ShortenLinksTable() {
  const [links, setLinks] = useState([]);
  const { getShortenLinks } = useShortenLink();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchLinks"],
    queryFn: () => getShortenLinks(),
  });

  useEffect(() => {
    if (data) setLinks(data.data);
  }, [data]);

  return (
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
              <td>
                {row?.link}
              </td>
              <td className="fw-500 text-truncate">
                <input value={row.target} type="textarea" readonly/>
              </td>
              <td>{row.banned ? 'Deactive' : 'Active'}</td>
              <td>
                <div
                  className={`rounded-100 py-4 text-center col-12 text-14 fw-500`}
                >
                  {row?.visit_count}
                </div>
              </td>
              <td>{dayjs(row?.created_at).format('DD/MM/YYYY HH:mm')}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
