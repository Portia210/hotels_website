import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useTrans from "@/hooks/useTrans";

export default function LoginBtns({ headerTrans }) {
  const { t, isReverse } = useTrans();
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();
  const { signOut } = useClerk();

  const renderPopover = () => {
    const Popover = require("bootstrap/js/dist/popover");
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );

    const onLogout = () => {
      signOut().then(() => {
        router.push("/login");
      });
    };

    const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => {
      const popoverContent = (
        <div className="y-gap-20">
          <Link
            href="/dashboard/db-account"
            className={`d-flex items-center text-15 lh-1 fw-500 ${
              isReverse && "justify-content-end"
            } `}
          >
            <div className={`d-flex ${isReverse && "flex-row-reverse"}`}>
              <Image
                width={20}
                height={20}
                src="/img/dashboard/sidebar/compass.svg"
                alt="image"
                className={`${isReverse ? "ml-15" : "mr-15"}`}
              />
              <span>{t("Dashboard.Sidebar.dashboard")}</span>
            </div>
          </Link>
          <Link
            href="#"
            onClick={() => onLogout()}
            className={`d-flex items-center text-15 lh-1 fw-500 ${
              isReverse && "justify-content-end"
            } `}
          >
            <div className={`d-flex ${isReverse && "flex-row-reverse"}`}>
              <Image
                width={20}
                height={20}
                src="/img/dashboard/sidebar/log-out.svg"
                alt="image"
                className={`${isReverse ? "ml-15" : "mr-15"}`}
              />
              <span>{t("Dashboard.Sidebar.logout")}</span>
            </div>
          </Link>
        </div>
      );

      let title = `${t("Dashboard.Sidebar.hello")} ${
        user?.fullName || user?.primaryEmailAddress?.emailAddress
      }`;
      if (isReverse) {
        title = `${
          user?.fullName || user?.primaryEmailAddress?.emailAddress
        } ${t("Dashboard.Sidebar.hello")}`;
      }
      return new Popover(popoverTriggerEl, {
        html: true,
        title,
        popperConfig: () => {
          return {
            placement: isReverse ? "bottom-start" : "bottom-end",
            strategy: "fixed",
          };
        },
        content: () => {
          const container = document.createElement("span");
          const root = createRoot(container);
          root.render(popoverContent);
          return container;
        },
      });
    });
  };

  useEffect(() => {
    renderPopover();
  }, [isLoaded, isSignedIn]);

  if (isLoaded && isSignedIn) {
    return (
      <div
        className={`d-flex items-center lg:d-none ${
          isReverse ? "mr-20" : "ml-20"
        } is-menu-opened-hide md:d-none`}
      >
        <button
          html="true"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-trigger="focus"
          className={`d-md-inline-flex px-10 z-5 h-50 text-white ${
            isReverse ? "mr-10" : "ml-10"
          }`}
        >
          <Image
            width={100}
            height={100}
            src={user?.imageUrl || "/img/avatars/3.png"}
            alt="image"
            className="size-40 rounded object-cover bg-light mt-4"
          />
        </button>
      </div>
    );
  }
  return (
    <div
      className={`d-flex items-center lg:d-none ${
        isReverse ? "mr-20" : "ml-20"
      } is-menu-opened-hide md:d-none`}
    >
      <Link
        href="/signup"
        className={`d-md-inline-flex d-xxl-none button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ${
          isReverse ? "mr-20" : "ml-20"
        }`}
      >
        {headerTrans?.signin} / {headerTrans?.register}
      </Link>

      <Link
        href="/login"
        className={`d-md-none d-xxl-inline-flex button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ${
          isReverse ? "mr-20" : "ml-20"
        }`}
      >
        {headerTrans?.signin}
      </Link>
      <Link
        href="/signup"
        className={`d-md-none d-xxl-inline-flex button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ${
          isReverse ? "mr-20" : "ml-20"
        }`}
      >
        {headerTrans?.register}
      </Link>
    </div>
  );
}
