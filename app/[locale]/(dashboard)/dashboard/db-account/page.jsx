import TransConfig from "@/components/config/TransConfig";
import DashboardPage from "@/components/dashboard/dashboard/db-account";
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
      <TransConfig messages={messages} />
    </>
  );
}
