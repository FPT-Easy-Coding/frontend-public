import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import ThemeSwap from "./ThemeSwap";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10" >
      <div className="flex-1 gap-10">
        <img src={logo} alt="my logo" className="btn no-animation" />
        <div>
          <NavLink to="/" className="btn btn-ghost btn-sm rounded-btn">Home</NavLink>
          <NavLink className="btn btn-ghost btn-sm rounded-btn">About</NavLink>
          <NavLink className="btn btn-ghost btn-sm rounded-btn">Contact</NavLink>
        </div>
        <div className="form-control w-1/3">
          <input
            type="text"
            placeholder="Search for quizzes, users, and more..."
            className="input input-bordered md:w-auto"
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        <ThemeSwap />
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "btn btn-ghost btn-active btn-md rounded-btn" : "btn btn-ghost btn-md rounded-btn")} 
        >
          Login
        </NavLink>
        <NavLink to="/signup" className="btn btn-primary btn-md rounded-btn">Sign up</NavLink>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
