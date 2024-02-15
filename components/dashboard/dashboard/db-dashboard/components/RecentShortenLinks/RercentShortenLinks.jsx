"use client";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useState } from "react";
import ShortenLinksTable from "./ShortenLinksTable";

const RercentShortenLinks = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="overflow-scroll scroll-bar-1 pt-30">
        <ShortenLinksTable />
      </div>
    </QueryClientProvider>
  );
};

export default RercentShortenLinks;
