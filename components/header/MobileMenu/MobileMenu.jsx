"use client";

import Link from "next/link";

import useTransStore from "@/store/useTransStore";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import CurrencyMobileMenu from "./CurrencyMobileMenu";
import LanguageMobileMenu from "./LanguageMobileMenu";

const MobileMenu = () => {
  const messages = useTransStore((state) => state.messages);
  const router = useRouter();

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link href="/">
          <img src="/img/general/logo-dark.svg" alt="brand" />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
          <MenuItem onClick={() => router.push("/")}>Destinations</MenuItem>
          <MenuItem component={<CurrencyMobileMenu />}></MenuItem>
          <MenuItem component={<LanguageMobileMenu />}></MenuItem>
          <MenuItem onClick={() => router.push("/")}>Contact</MenuItem>
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
