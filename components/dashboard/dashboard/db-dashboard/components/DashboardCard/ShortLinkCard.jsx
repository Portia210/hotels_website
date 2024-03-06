import useShortenLink from "@/hooks/useShortenLink";
import { useQuery } from "@tanstack/react-query";

export default function ShortLinkCard() {
  const { getLinkStats } = useShortenLink();
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchLinkStats"],
    queryFn: () => getLinkStats(),
  });

  const item = {
    title: "Short links",
    amount: `${data?.total_24 || 0} links today`,
    description: `${data?.total || 0} short links total`,
    icon: <i className="bi bi-link-45deg"></i>,
  };

  return (
    <div className="py-30 px-30 rounded-4 bg-white shadow-3">
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-lg-12 col-md-auto text-nowrap">
          <div className="fw-500 lh-14 text-primary">{item.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5">{item.amount}</div>
          <div className="text-15 lh-14 text-light-1 mt-5">
            {item.description}
          </div>
        </div>
        <div className="col-auto text-primary lh-1 text-30">{item.icon}</div>
      </div>
    </div>
  );
}
