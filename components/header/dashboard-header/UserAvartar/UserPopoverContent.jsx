import Image from "next/image";
import Link from "next/link";

export default function UserPopoverContent({ t, isReverse, onLogout }) {
  return (
    <div className="y-gap-20">
      <Link
        href="/"
        className={`d-flex items-center text-15 lh-1 fw-500 ${
          isReverse && "justify-content-end"
        } `}
      >
        <div className={`d-flex ${isReverse && "flex-row-reverse"}`}>
          <Image
            width={20}
            height={20}
            src="/img/dashboard/sidebar/map.svg"
            alt="image"
            className={`${isReverse ? "ml-15" : "mr-15"}`}
          />
          <span> {t("Header.home")}</span>
        </div>
      </Link>
      <Link
        href="#"
        onClick={onLogout}
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
}
