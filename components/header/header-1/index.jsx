"use client";

import { isActiveLink } from "@/utils/linkActiveChecker";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CurrencyMegaMenu from "../CurrencyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";
import MainMenu from "../MainMenu";
import MobileMenu from "../MobileMenu/MobileMenu";
import LoginBtns from "./LoginBtns";
import { useUser } from "@clerk/nextjs";
import useTrans from "@/hooks/useTrans";

const Header1 = () => {
  const { isSignedIn } = useUser();
  const { isReverse } = useTrans();

  const pathname = usePathname();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const isHome = isActiveLink("/", pathname);
    if (!isHome) {
      return setNavbar(true);
    } else {
      window.addEventListener("scroll", changeBackground);
    }
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-1 is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div
            className={`row justify-between items-center ${
              isReverse ? "flex-row-reverse" : ""
            }`}
          >
            <div className="col-auto">
              <div
                className={`d-flex items-center ${
                  isReverse ? "flex-row-reverse" : ""
                }`}
              >
                <Link
                  href="/"
                  className={`header-logo ${isReverse ? "ml-20" : "mr-20"}`}
                >
                  <img src="/img/general/logo-light.svg" alt="logo icon" />
                  <img src="/img/general/logo-dark.svg" alt="logo icon" />
                </Link>
                {/* End logo */}

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu
                      style={`text-white ${
                        isReverse ? "flex-row-reverse" : ""
                      }`}
                    />
                  </div>
                </div>
                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div
                className={`d-flex items-center ${
                  isReverse ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`row x-gap-20 items-center ${
                    isReverse ? "flex-row-reverse" : ""
                  } md:d-none`}
                >
                  <CurrencyMegaMenu textClass="text-white" />
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider*/}

                  <LanguageMegaMenu textClass="text-white" />
                  {/* End Megamenu for Language */}
                </div>
                {/* End language and currency selector */}

                {/* Start btn-group */}
                <LoginBtns />

                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div
                  className={`d-none lg:d-flex x-gap-20 items-center text-white ${
                    isReverse ? "flex-row-reverse pr-30" : "pl-30"
                  }`}
                >
                  {!isSignedIn && (
                    <div>
                      <Link
                        href="/login"
                        className="d-flex items-center icon-user text-inherit text-22"
                      />
                    </div>
                  )}
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet "
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu isReverse={isReverse} />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
