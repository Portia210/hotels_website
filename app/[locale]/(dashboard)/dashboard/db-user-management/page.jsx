import TransConfig from "@/components/config/TransConfig";
import DashboardPage from "@/components/dashboard/dashboard/db-user-management";
import { useMessages } from "next-intl";

export const metadata = {
  title: "GoTrip: User Management",
  description: "GoTrip - Travel & Tour",
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
