import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  return (
    <header className="mt-4 flex items-center justify-between px-4">
      <Logo />
      <NavLink
        to="/manual"
        className="cursor-pointer self-center rounded-full bg-blue-600 px-4 py-2 text-sm tracking-wide text-blue-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300 hover:bg-blue-500 md:text-base"
      >
        Manual
      </NavLink>
    </header>
  );
}

export default Header;
