import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import logoutSvg from "../assets/icons/logout.svg"
import { logout } from "./Logout";

export const Navbar = () => {
  const navigate = useNavigate();
  const activeClass = ({ isActive }) => (isActive ? "text-secondary" : "")
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, setUser } = useAuth();

  return (
    <div className="bg-gray">
      <div className="px-4 py-3 sm:py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-7xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <NavLink
            to="/"
            aria-label="BlogDom"
            title="BlogDom"
            className="inline-flex items-center"
          >
            <img src="/icon.png" alt="" className="w-7 sm:w-10 h-auto"/>
            <span className="text-2xl sm:text-3xl font-bold tracking-wider bg-linear-to-r from-white via-primary to-primary bg-clip-text hover:bg-linear-to-l hover:from-white hover:via-primary hover:to-primary text-transparent transition-all duration-300 uppercase">
              logDom
            </span>
          </NavLink>
          <ul className=" items-center hidden space-x-8 lg:flex *:tracking-wider">
            <li>
              <NavLink
                to="/"
                aria-label="Our product"
                title="Our product"
                className={activeClass}
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                aria-label="Our product"
                title="Our product"
                className={activeClass}
              >
                About Us
              </NavLink>
            </li>
            {user ? (
              <>
            <li>
              <NavLink
                to="/my-blogs"
                aria-label="New Blog"
                title="New Blog"
                className={activeClass}
              >
                My Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={activeClass}
                aria-label="Sign up"
                title="Sign up"
              >
                <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                alt="avatar"
                className="w-10 h-auto rounded-full"
                ></img>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={()=>logout(setUser, navigate)}
                className={activeClass}
                title="Logout"
              >
                <img src={logoutSvg}
                alt="avatar"
                aria-label="avatar"
                className="w-8 h-auto rounded-full"
                ></img>
              </NavLink>
            </li>     
            </>      
              
            ) : (
              <>
            <li>
              <NavLink
                to="/signin"
                aria-label="About us"
                title="About us"
                className={activeClass}
              >
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white hover:text-gray transition duration-300 rounded shadow-md bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </NavLink>
            </li>
            </>
            )}
          </ul>
          <div className="lg:hidden z-10 transition-all duration-300">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-200" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-gray border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <NavLink
                        to="/"
                        aria-label="BlogDom"
                        title="BlogDom"
                        className="inline-flex items-center"
                      >
                        <img src="/icon.png" alt="" className="w-10 h-auto"/>
                        <span className="text-3xl font-bold tracking-wide text-secondary hover:text-primary duration-200 uppercase">
                          logDom
                        </span>
                      </NavLink>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-200 hover:text-gray" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4 ">
                      <li>
                        <NavLink
                          to="/"
                          aria-label="Our product"
                          title="Our product"
                          className={activeClass}
                        >
                          Blogs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/about"
                          aria-label="About Us"
                          className={activeClass}
                        >
                          About Us
                        </NavLink>
                      </li>
                      {user ? (
                        <>
                        <li>
                          <NavLink
                            to="/my-blogs"
                            className={activeClass}
                          >
                            My Blogs
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/profile"
                            className={activeClass}
                            title="Profile"
                          >
                            <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                            alt="avatar"
                            aria-label="avatar"
                            className="w-10 h-auto rounded-full"
                            ></img>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={()=>logout(setUser, navigate)}
                            className={activeClass}
                            title="Logout"
                          >
                            <img src={logoutSvg}
                            alt="avatar"
                            aria-label="avatar"
                            className="w-8 h-auto rounded-full"
                            ></img>
                          </NavLink>
                        </li>
                        </>
                        ) : (
                          <>
                        <li>
                          <NavLink
                            to="/signin"
                            aria-label="About us"
                            title="About us"
                            className={activeClass}
                          >
                            Sign in
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/signup"
                            className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white hover:text-gray transition duration-300 rounded shadow-md bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
                          </NavLink>
                        </li>
                        </>
                        )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};