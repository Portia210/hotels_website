import React from "react";
import DashboardPage from "@/components/dashboard/dashboard/db-dashboard";
import { useMessages } from "next-intl";
import TransConfig from "@/components/config/TransConfig";

export const metadata = {
  title: "Dashboard || Agent-Space - Travel & Tour React NextJS Template",
  description: "Agent-Space - Travel & Tour React NextJS Template",
};

export default function page() {
  const messages = useMessages();

  return (
    <>
      <DashboardPage />
      <TransConfig messages={messages} />
    </>
  );
}
