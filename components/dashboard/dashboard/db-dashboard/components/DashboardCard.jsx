'use client';
import CreditCard from "./DashboardCard/CreditCard";
import PlanCard from "./DashboardCard/PlanCard";
import ShortLinkCard from "./DashboardCard/ShortLinkCard";
import ShortLinkOverviewCard from "./DashboardCard/ShortLinkOverviewCard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react";


const DashboardCard = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <div className="row y-gap-30">
        <div className="col-xl-3 col-md-6">
          <PlanCard />
        </div>
        <div className="col-xl-3 col-md-6">
          <CreditCard />
        </div>
        <div className="col-xl-3 col-md-6">
          <ShortLinkCard />
        </div>
        <div className="col-xl-3 col-md-6">
          <ShortLinkOverviewCard />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default DashboardCard;
