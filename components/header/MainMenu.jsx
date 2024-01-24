import Link from "next/link";
import { usePathname } from "next/navigation";

const MainMenu = ({ style = "" }) => {
  const pathname = usePathname();

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <a href="/">
          <span className="mr-10">{"menu.home"}</span>
        </a>

        <li className={pathname === "/destinations" ? "current" : ""}>
          <Link href="/destinations">Destinations</Link>
        </li>
        {/* End Destinatinos single menu */}

        <li className={pathname === "/contact" ? "current" : ""}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
