import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import logo from "../assets/logo.svg";
import ThemeSwap from "./ThemeSwap";
import { useEffect } from "react";
import { toast } from "react-toastify";


const guestBtn = () => {
  return (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "hidden" : "btn btn-primary btn-md rounded-3xl"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          isActive ? "hidden" : "btn btn-secondary btn-md rounded-3xl"
        }
      >
        Sign up
      </NavLink>
    </>
  );
};

const userBtn: React.FC<{ data: any; firstName: string; lastName: string }> = (data) => {
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0}>
          <div tabIndex={0} className="btn btn-ghost no-animation">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="hmmm" />
              </div>
            </div>
            <div className="ml-[10px] flex normal-case items-center justify-center rounded-lg">
              <div className="flex flex-col">
                <div className="text-xs text-left">Hello,</div>
                <div className="text-base font-semibold">
                  {data ? data.firstName + " " + data.lastName : "no data"}
                </div>
              </div>
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="account" className="justify-between">
              Profile
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <Form action="/logout" method="post">
            <li>
              <button type="submit">Logout</button>
            </li>
          </Form>
        </ul>
      </div>
    </>
  );
};

const Navbar = () => {
  const data = useRouteLoaderData("root-loader");
  useEffect(() => {
    if ((data as { error?: boolean })?.error) {
      toast.error((data as { message: string })?.message);
    }
  }, [data]);
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10">
      <div className="flex-1 gap-10">
        <img src={logo} alt="my logo" className="btn no-animation" />
        <div>
          <NavLink to="/" className="btn btn-ghost btn-sm rounded-btn">
            Home
          </NavLink>
          <NavLink to="/about" className="btn btn-ghost btn-sm rounded-btn">About</NavLink>
          <NavLink to="/contact" className="btn btn-ghost btn-sm rounded-btn">
            Contact
          </NavLink>
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
        {data ? userBtn((data as { data : any; firstName: string; lastName: string })) : guestBtn()}
      </div>
    </div>
  );
};

export default Navbar;
