import { AuthenticateWithRedirectCallback, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SSOCallbackPage() {
  const user = await currentUser();
  if (user) return redirect("/");
  return (
    <>
      <AuthenticateWithRedirectCallback />
    </>
  );
}
