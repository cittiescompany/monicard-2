/* eslint-disable react/prop-types */

import { FiChevronDown } from "react-icons/fi";
import { navbarData } from "../lib/data";
import { IoMdArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../lib/utils";
import { CiLogout } from "react-icons/ci";
// import { Link } from '@nextui-org/react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/sign-in"); // Redirect to login page
  };
  return (
    <nav className="bg-[#31397a] rounded-full text-white px-6 py-4 items-center hidden md:flex justify-between shadow-md">
      {/* bg-[#171927] */}
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          src={navbarData.logo}
          alt="logo"
          className="w-24 bg-white rounded"
        />
      </div>

      {/* Links */}
      <ul className="flex items-center space-x-8">
        {navbarData.links.map((link, index) => (
          <li key={index} className="relative group">
            <button
              className={`font-medium ${
                link.dropdown ? "flex items-center space-x-1" : ""
              }`}
            >
              {link.name}
              {link.dropdown && (
                <span className="ml-1 text-gray-400">
                  <FiChevronDown />
                </span> // Dropdown icon
              )}
            </button>

            {/* Dropdown Menu */}
            {link.dropdown && (
              <div className="absolute hidden group-hover:flex flex-col bg-[#264586] opacity-95 text-gray-100 py-2 shadow-lg rounded-md min-w-[18rem] z-50 px-2">
                {link.dropdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 hover:text-[#21293A] py-2 hover:bg-gray-200 cursor-pointer rounded-md"
                  >
                    <div>
                      {item?.icon &&
                        (typeof item.icon === "string" ? (
                          item.icon.endsWith(".svg") ||
                          item.icon.startsWith("data:image/svg+xml") ? (
                            <img src={item.icon} className="w-8 h-8" alt="" />
                          ) : (
                            <item.icon size={22} />
                          )
                        ) : (
                          <item.icon size={22} />
                        ))}
                    </div>
                    {item.href? <Link to={item?.href} className="font-medium">{item.name}</Link>:<span className="font-medium">{item.name}</span>}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {isAuthenticated() ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 text-white rounded-full hover:bg-red-700 flex items-center gap-1"
        >
          <CiLogout size={18} />
          Logout
        </button>
      ) : (
        <Link to='/sign-in' className="bg-gray-200 px-4 py-2 text-[#31397a] rounded-full flex items-center space-x-1 hover:bg-gray-400">
        <span>{navbarData.signIn}</span>
        <span className="ml-1">
          <IoMdArrowForward size={18} />
        </span>
      </Link>
      )}

      {/* Sign In Button */}
   
    </nav>
  );
};

export default Navbar;
