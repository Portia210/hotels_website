import useShortenLink from '@/hooks/useShortenLink';
import useTrans from '@/hooks/useTrans';
import { useQuery } from '@tanstack/react-query';

export default function ShortLinkOverviewCard() {
  const { t, isReverse } = useTrans();
  const { getLinkStats } = useShortenLink();
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchLinkStats'],
    queryFn: () => getLinkStats(),
    refetchInterval: 4000,
  });

  const item = {
    title: t('DashboardCard.LinkClick.title'),
    amount: `${data?.visits_24 || 0} ${t('DashboardCard.LinkClick.today')}`,
    description: `${data?.visits || 0} ${t('DashboardCard.LinkClick.total')}`,
    icon: <i className="bi bi-graph-up"></i>,
  };

  return (
    <div
      className="py-30 px-30 rounded-4 bg-white shadow-3"
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-lg-12 col-md-auto text-nowrap">
          <div className="fw-500 lh-14 text-primary">{item.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5">{item.amount}</div>
          <div className="text-15 lh-14 text-light-1 mt-5">
            {item.description}
          </div>
        </div>
        <div className="col-auto text-primary lh-sm text-25">{item.icon}</div>
      </div>
    </div>
  );
}
