import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  return (
    <header className="my-4 flex items-center justify-between text-xl font-semibold">
      <Logo />
      <NavLink to="/manual" className="transition-colors hover:text-blue-800">
        Manual
      </NavLink>
    </header>
  );
}

export default Header;
