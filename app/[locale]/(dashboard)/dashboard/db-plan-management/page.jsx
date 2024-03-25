import TransConfig from "@/components/config/TransConfig";
import DashboardPage from "@/components/dashboard/dashboard/db-plan-management";
import { useMessages } from "next-intl";

export const metadata = {
  title: "Plan Management || Agent-Space - Travel & Tour React NextJS Template",
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
