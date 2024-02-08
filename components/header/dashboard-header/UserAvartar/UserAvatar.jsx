import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import UserPopoverContent from "./UserPopoverContent";
import useTrans from "@/hooks/useTrans";

export default function UserAvatar({ user }) {
  const { t } = useTrans();
  const router = useRouter();
  const { signOut } = useClerk();

  const onLogout = async () => {
    await signOut();
    router.push("/");
  };

  const renderPopover = () => {
    const Popover = require("bootstrap/js/dist/popover");
    const popoverTriggerEl = document.getElementById("userAvatarPopover");

    if (!popoverTriggerEl) return;

    const popoverContent = <UserPopoverContent onLogout={onLogout} />;

    new Popover(popoverTriggerEl, {
      html: true,
      title: `${t('Dashboard.Sidebar.hello')} ${
        user?.fullName || user?.primaryEmailAddress?.emailAddress
      }`,
      popperConfig: () => {
        return {
          placement: "bottom-end",
        };
      },
      content: () => {
        const container = document.createElement("div");
        const root = createRoot(container);
        root.render(popoverContent);
        return container;
      },
    });
  };

  useEffect(() => {
    renderPopover();
  }, [user]);

  return (
    <button
      id="userAvatarPopover"
      data-bs-container="body"
      data-bs-toggle="popover"
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
