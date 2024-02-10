import React from "react";
import DashboardPage from "@/components/dashboard/dashboard/db-settings";
import TransConfig from "@/components/config/TransConfig";
import { useMessages } from "next-intl";

export const metadata = {
  title: "Settings || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

export default function page() {
  const messages = useMessages();

  return (
    <>
      <DashboardPage />
      <TransConfig messages={messages}/>
    </>
  );
}
