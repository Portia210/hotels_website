"use client";

import Image from "next/image";
import Link from "next/link";

import { isActiveLink } from "@/utils/linkActiveChecker";
import { useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import useTrans from "@/hooks/useTrans";

const Sidebar = () => {
  const { t } = useTrans();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const sidebarContent = [
    {
      icon: "/img/dashboard/sidebar/compass.svg",
      name: t("Dashboard.Sidebar.dashboard"),
      routePath: "/dashboard/db-dashboard",
    },
    {
      icon: "/img/dashboard/sidebar/account.svg",
      name: t("Dashboard.Sidebar.account"),
      routePath: "/dashboard/db-account",
    },
    {
      icon: "/img/dashboard/sidebar/user_management.svg",
      name: t("Dashboard.Sidebar.userManagement"),
      routePath: "/dashboard/db-user-management",
    },
    {
      icon: "/img/dashboard/sidebar/gear.svg",
      name: t("Dashboard.General.changePassword"),
      routePath: "/dashboard/db-settings",
    },
    {
      icon: "/img/dashboard/sidebar/log-out.svg",
      name: t("Dashboard.Sidebar.logout"),
      routePath: "#",
    },
  ];

  const onLogout = (routePath) => {
    if (routePath !== '#') return;
    signOut()
      .then(() => {
        router.push("/login");
      })
  };
  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item, index) => (
        <div className="sidebar__item" key={index}>
          <div
            className={`${
              isActiveLink(item.routePath, pathname) ? "-is-active" : ""
            } sidebar__button `}
          >
            <Link
              href={item.routePath}
              onClick={() => onLogout(item.routePath)}
              className="d-flex items-center text-15 lh-1 fw-500"
            >
              <Image
                width={20}
                height={20}
                src={item.icon}
                alt="image"
                className="mr-15"
              />
              {item.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
