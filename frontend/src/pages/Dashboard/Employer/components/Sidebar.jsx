import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useLocation } from "react-router-dom";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import IconButton from "@mui/material/IconButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/candidate/authSlice";

const manuItems = [
  {
    page: "Company Profile",
    path: "/employer/company-profile",
    icon: <ApartmentOutlinedIcon />,
  },
  {
    page: "Post Job",
    path: "/employer/post-job",
    icon: <DriveFolderUploadOutlinedIcon />,
  },
  {
    page: "Manage Jobs",
    path: "/employer/manage-jobs",
    icon: <ManageSearchOutlinedIcon />,
  },
  {
    page: "View Applicants",
    path: "/employer/view-applicants",
    icon: <PeopleAltOutlinedIcon />,
  },
];

const Sidebar = ( { openSidebar, setOpenSidebar } ) =>
{
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () =>
  {
    dispatch( logout() )
    navigate( "/login" )
  }

  return (
    <>
      <div
        className={ `fixed top-0 left-0 h-screen min-w-full sm:min-w-[50%] lg:min-w-[20%] lg:max-w-[21%] bg-(--primary-color) z-50 transform transition-transform duration-300 ease-in-out
          ${ openSidebar ? "translate-x-0" : "-translate-x-full" } 
          lg:translate-x-0`}
      >
        <div className="mt-6 lg:hidden px-5 flex justify-end">
          <IconButton
            onClick={ () => setOpenSidebar( false ) }
            sx={ { border: "1px solid #f1f1f1", color: "#fff" } }
          >
            <ClearOutlinedIcon />
          </IconButton>
        </div>
        <div className="lg:mt-20 mt-5 text-center">
          <Link to="/" className="logo font-medium text-[20px] text-white">
            Hire Via
          </Link>
        </div>

        <ul className="mt-10 space-y-2">
          { manuItems.map( ( item, index ) =>
          {
            let activePaths = [ item.path ];

            if ( item.path === "/employer/company-profile" )
            {
              activePaths.push( "/employer/edit-company-profile" );
            }

            const isActive = activePaths.includes( location.pathname );

            return (
              <li
                key={ index }
                className={ `px-6 ml-5 lg:mr-0 mr-5 text-white py-4 ${ isActive && "activeDashboardPage"
                  }` }
              >
                <Link
                  to={ item.path }
                  className="text-[16px] flex items-center gap-2"
                  onClick={ () => setOpenSidebar( false ) }
                >
                  { item.icon }
                  { item.page }
                </Link>
                { isActive && (
                  <>
                    <div className="circle hidden lg:block"></div>
                    <div className="circle2 hidden lg:block"></div>
                  </>
                ) }
              </li>
            );
          } ) }
        </ul>

        <div className="px-6 text-white py-4 ml-5 absolute bottom-8">
          <button onClick={ handleLogout } className="cursor-pointer text-[16px] flex items-center gap-2 ">
            <LogoutOutlinedIcon />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
