import React from "react";
import DashboardPage from "@/components/dashboard/dashboard/db-dashboard";
import { useMessages } from "next-intl";
import TransConfig from "@/components/config/TransConfig";

export const metadata = {
  title: "Dashboard || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
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
