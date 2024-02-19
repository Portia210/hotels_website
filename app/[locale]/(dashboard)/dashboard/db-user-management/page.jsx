import TransConfig from "@/components/config/TransConfig";
import DashboardPage from "@/components/dashboard/dashboard/db-user-management";
import { useMessages } from "next-intl";
import { redirect } from "next/navigation";
import { UserRoles, checkUserRole } from "@/utils/roleCheck";

export const metadata = {
  title: "GoTrip: User Management",
  description: "GoTrip - Travel & Tour",
};

export default async function page() {
  const allowed = await checkUserRole([
    UserRoles.SITE_MANAGER,
    UserRoles.ADMIN,
  ]);
  if (!allowed) return redirect("/404");

  const messages = useMessages();

  return (
    <>
      <DashboardPage />
      <TransConfig messages={messages} />
    </>
  );
}
