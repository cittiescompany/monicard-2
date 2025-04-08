import { useState } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { FiMenu, FiX } from "react-icons/fi"; // Menu icons
import { navItems } from "../lib/data";
// import logo from '../assets/New-Credo-Logo-Blue-ETZ.svg'
import logo from '../assets/monicard.png'
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { CiLogout } from "react-icons/ci";
import { isAuthenticated } from "../lib/utils";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();


  //  to='/sign-in'

  const handleLogout = () => {
    logout()
  };
  return (
    <div className="relative md:hidden bg-[#31397a] rounded-full shadow-md">
      {/* Navbar Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-20 bg-white rounded" />
        </div>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-200 focus:outline-none"
        >
          <div
            className={`transform transition-transform p-2 hover:bg-gray-600 rounded-full duration-300 ease-in-out ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-16 left-0 z-[999] w-full bg-[#264586]  opacity-95 rounded-md shadow-lg transition-transform duration-300 ease-in-out ${
          menuOpen ? "transform scale-y-100" : "transform scale-y-0"
        } origin-top`}
      >
        <ul className="flex flex-col space-y-2 px-4 py-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {/* Check if the nav item has a dropdown */}
              {item.dropdown ? (
                <Accordion
                  className="border-b border-gray-600"
                  defaultExpandedKeys={[]}
                >
                  <AccordionItem
                    classNames={{ title: "text-gray-100" }}
                    className="text-gray-100"
                    title={item.name}
                    key={item.name}
                  >
                    <ul className="mt-2">
                      {item.dropdown.map((dropdownItem, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 px-4 hover:text-[#21293A] py-2 hover:bg-gray-200 cursor-pointer rounded-md"
                        >
                          <div>
                          {dropdownItem?.icon &&
                        (typeof dropdownItem.icon === "string" ? (
                          dropdownItem.icon.endsWith(".svg") ||
                          dropdownItem.icon.startsWith("data:image/svg+xml") ? (
                            <img src={dropdownItem.icon} className="w-8 h-8" alt="" />
                          ) : (
                            <dropdownItem.icon size={22} />
                          )
                        ) : (
                          <dropdownItem.icon size={22} />
                        ))}
                          </div>
                          <span className="font-medium">
                            {dropdownItem.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                </Accordion>
              ) : item.name.includes("Sign In") ? (
            <div>
{isAuthenticated() ? (
        <Button
          onPress={handleLogout}
          className="bg-red-500 px-4 py-2 text-white rounded-full hover:bg-red-700 flex items-center gap-1"
        >
          <CiLogout size={18} />
          Logout
        </Button>
      ) : (
        <Button onPress={()=>navigate('/sign-in')} className="bg-gray-200 px-4 py-2 text-[#31397a] !w-auto rounded-full flex items-center space-x-1 hover:bg-gray-400">
        <span>{item.name}</span>
        <span className="ml-1"><IoMdArrowForward size={18}/></span>
      </Button>
      )}
            </div>
              ) : (
                <p
                  className="px-4 text-gray-100 hover:text-[#21293A] py-2 hover:bg-gray-200 cursor-pointer rounded-md"
                >
                  {item.name}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
