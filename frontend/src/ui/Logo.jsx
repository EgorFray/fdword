import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <div className="w-15">
      <NavLink
        to="/dashboard"
        className="inline-block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        <img src="/logo.png" className="block cursor-pointer" />
      </NavLink>
    </div>
  );
}

export default Logo;
