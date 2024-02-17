import Wrapper from "@/components/layout/Wrapper";
import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import { auth, currentUser } from "@clerk/nextjs";
import MainHome from "./(homes)/home_1/page";
import { redirect } from "next/navigation";
import { sleep } from "@/utils/sleep";

export const metadata = {
  title: "GoTrip: Home",
  description: "GoTrip - Travel & Tour",
};

const UserStatus = {
  BANNED: "BANNED",
  DELETED: "DELETED",
};

export default async function Home() {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;

  if (
    (user && publicMetadata?.status === UserStatus.BANNED) ||
    publicMetadata?.status === UserStatus.DELETED
  ) {
    const { getToken } = auth();
    const token = await getToken();

    const res = await fetch(`${TOURCOMPARE_BE_URL}/api/v1/auth/force-logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
    if (res.ok) {
      redirect("/404");
    }
  }

  return (
    <>
      <Wrapper>
        <MainHome />
      </Wrapper>
    </>
  );
}
