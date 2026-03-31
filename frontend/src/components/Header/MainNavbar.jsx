import React from "react";
import { Link, useLocation } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";

const MainNavbar = () =>
{
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Find Job", path: "/jobs" },
    { name: "Employer", path: "/employer/company-profile" },
    { name: "Candidates" },
    { name: "Pricing Plans" },
    { name: "Customer Support" },
  ];

  return (
    <nav className="px-12 py-2.5 hidden lg:flex justify-between items-center bg-[#f5f5f5]">
      <ul className="flex gap-10 text-[15px]">
        { menuItems.map( ( item ) => (
          <li key={ item.name }>
            <Link
              to={ item.path }
              className={ `text-[#676666] ${ location.pathname === item.path ? "activeLink" : ""
                }` }
            >
              { item.name }
            </Link>
          </li>
        ) ) }
      </ul>

      <div>
        <Link className="text-[15px] font-medium">
          <CallIcon sx={ { fontSize: 20, marginRight: 0.5 } } />
          +91 7665407031
        </Link>
      </div>
    </nav>
  );
};

export default MainNavbar;
