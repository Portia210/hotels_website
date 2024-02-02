import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UserAvatar({ user }) {
  const router = useRouter();
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
        <div className="y-gap-20 mr-10">
          <Link
            href="/dashboard/db-dashboard"
            className="d-flex items-center text-15 lh-1 fw-500"
          >
            <Image
              width={20}
              height={20}
              src="/img/dashboard/sidebar/compass.svg"
              alt="image"
              className="mr-15"
            />
            Dashboard
          </Link>
          <Link
            href="#"
            onClick={() => onLogout()}
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

      return new Popover(popoverTriggerEl, {
        html: true,
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
  }, []);

  return (
    <button
      html="true"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-placement={false ? "right" : "left"}
      data-bs-trigger="focus"
    >
      <Image
        width={50}
        height={50}
        src={user?.imageUrl || "/img/avatars/3.png"}
        alt="image"
        className="size-40 rounded-22 object-cover"
      />
    </button>
  );
}
