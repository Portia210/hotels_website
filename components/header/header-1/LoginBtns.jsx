import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function LoginBtns({ isReverse, headerTrans }) {
  const { isSignedIn, isLoaded, user } = useUser();
  
  if (isLoaded && isSignedIn) {
    return (
      <div
        className={`d-flex items-center lg:d-none ${
          isReverse ? "mr-20" : "ml-20"
        } is-menu-opened-hide md:d-none`}
      >
        <Link
          href="/dashboard/db-dashboard"
          className={`d-md-inline-flex button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ${
            isReverse ? "mr-20" : "ml-20"
          }`}
        >
          Dashboard
        </Link>
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
