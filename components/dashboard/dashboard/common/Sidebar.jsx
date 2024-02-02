"use client";

import Image from "next/image";
import Link from "next/link";

import { isActiveLink } from "@/utils/linkActiveChecker";
import { useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const sidebarContent = [
    {
      id: 1,
      icon: "/img/dashboard/sidebar/compass.svg",
      name: "Dashboard",
      routePath: "/dashboard/db-dashboard",
    },
    {
      id: 4,
      icon: "/img/dashboard/sidebar/gear.svg",
      name: " Settings",
      routePath: "/dashboard/db-settings",
    },
    {
      id: 5,
      icon: "/img/dashboard/sidebar/log-out.svg",
      name: " Logout",
      routePath: "#",
    },
  ];

  const onLogout = (id) => {
    if (id !== 5) return;
    signOut()
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.error("err -->", err);
      });
  };
  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item) => (
        <div className="sidebar__item" key={item.id}>
          <div
            className={`${
              isActiveLink(item.routePath, pathname) ? "-is-active" : ""
            } sidebar__button `}
          >
            <Link
              href={item.routePath}
              onClick={() => onLogout(item.id)}
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
