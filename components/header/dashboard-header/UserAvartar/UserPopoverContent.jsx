import Image from "next/image";
import Link from "next/link";

export default function UserPopoverContent({ onLogout }) {
  return (
    <div className="y-gap-20">
      <Link
        href="/"
        className="d-flex items-center text-15 lh-1 fw-500"
      >
        <Image
          width={20}
          height={20}
          src="/img/dashboard/sidebar/map.svg"
          alt="image"
          className="mr-15"
        />
        Home
      </Link>
      <Link
        href="#"
        onClick={onLogout}
        className="d-flex items-center text-15 lh-1 fw-500"
      >
        <Image
          width={20}
          height={20}
          src="/img/dashboard/sidebar/log-out.svg"
          alt="image"
          className="mr-15"
        />
        Logout
      </Link>
    </div>
  );
}
