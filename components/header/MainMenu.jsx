import useTrans from "@/hooks/useTrans";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainMenu = ({ style = "" }) => {
  const { t } = useTrans();
  const pathname = usePathname();

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <a href="/">
          <span className="mr-10">{t("Header.home")}</span>
        </a>

        <li className={pathname === "/user-guide" ? "current" : ""}>
          <Link href="/user-guide">{t("Header.userGuide")}</Link>
        </li>
        {/* End Destinatinos single menu */}

        <li className={pathname === "/shorten-link" ? "current" : ""}>
          <Link href="/shorten-link">{t("Header.shortenLink")}</Link>
        </li>

        <li className={pathname === "/pricing" ? "current" : ""}>
          <Link href="/pricing">{t("Header.pricing")}</Link>
        </li>

        <li className={pathname === "/contact" ? "current" : ""}>
          <Link href="/contact">{t("Header.contact")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
