import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="w-15">
      <Link to="/dashboard">
        <img
          src="/logo.png"
          className="flex cursor-pointer items-center justify-center"
        />
      </Link>
    </div>
  );
}

export default Logo;
