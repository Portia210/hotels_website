"use client";

import Link from "next/link";

import useTransStore from "@/store/useTransStore";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import CurrencyMobileMenu from "./CurrencyMobileMenu";
import LanguageMobileMenu from "./LanguageMobileMenu";

const MobileMenu = ({ isReverse }) => {
  const messages = useTransStore((state) => state.messages);
  const headerTrans = messages?.Header;
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

      <Sidebar width="400" backgroundColor="#fff" rtl={isReverse}>
        <Menu
          menuItemStyles={{
            root: {
              paddingLeft: 3,
            },
          }}
        >
          <MenuItem
            component={
              <CurrencyMobileMenu
                isReverse={isReverse}
                textTran={headerTrans?.currency}
              />
            }
          >
            Currency
          </MenuItem>
          <MenuItem
            component={
              <LanguageMobileMenu
                isReverse={isReverse}
                textTran={headerTrans?.language}
              />
            }
          />
        </Menu>
        <div className="border-bottom mb-20 mt-20"></div>
        <Menu>
          <MenuItem onClick={() => router.push("/dashboard/db-dashboard")}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => router.push("/")}>
            {headerTrans?.home}
          </MenuItem>
          <MenuItem onClick={() => router.push("/")}>
            {headerTrans?.destination}
          </MenuItem>
          <MenuItem onClick={() => router.push("/")}>
            {headerTrans?.contact}
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
