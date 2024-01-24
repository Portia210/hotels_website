import Link from "next/link";
import { usePathname } from "next/navigation";

const MainMenu = ({ style = "", messages }) => {
  const pathname = usePathname();

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <a href="/">
          <span className="mr-10">{messages?.home}</span>
        </a>

        <li className={pathname === "/destinations" ? "current" : ""}>
          <Link href="/destinations">{messages?.destination}</Link>
        </li>
        {/* End Destinatinos single menu */}

        <li className={pathname === "/contact" ? "current" : ""}>
          <Link href="/contact">{messages?.contact}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
