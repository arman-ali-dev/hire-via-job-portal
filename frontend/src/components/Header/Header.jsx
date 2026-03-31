import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { searchJobs } from "../../store/candidate/jobSlice";

const Header = () =>
{
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [ openMenu, setOpenMenu ] = useState( false );
  const [ query, setQuery ] = useState( "" );

  const [ isLoggedIn, setIsLoggedIn ] = useState( () => !!localStorage.getItem( "jwt" ) );

  useEffect( () =>
  {
    setIsLoggedIn( !!localStorage.getItem( "jwt" ) );
    setOpenMenu( false );
  }, [ location.pathname ] );

  const handleSearch = () =>
  {
    const trimmed = query.trim();
    if ( !trimmed ) return;
    dispatch( searchJobs( { keyword: trimmed, location: "" } ) );
    navigate( `/jobs?search=${ encodeURIComponent( trimmed ) }` );
  };

  const handleKeyDown = ( e ) =>
  {
    if ( e.key === "Enter" ) handleSearch();
  };

  const handleProfileClick = () =>
  {
    const role = localStorage.getItem( "role" );
    navigate( role === "EMPLOYER" ? "/employer/profile" : "/profile" );
  };

  // ── Auth Button — shared between desktop + mobile ──
  const AuthButton = ( { fullWidth = false } ) =>
    isLoggedIn ? (
      <IconButton
        onClick={ handleProfileClick }
        sx={ {
          color: "#1a6079",
          border: "1.5px solid #1a6079",
          borderRadius: "50%",
          p: 0.6,
          "&:hover": { background: "#f0f9ff" },
        } }
      >
        <AccountCircleIcon sx={ { fontSize: 24 } } />
      </IconButton>
    ) : (
      <Button
        variant="contained"
        onClick={ () => navigate( "/login" ) }
        fullWidth={ fullWidth }
        sx={ {
          textTransform: "capitalize",
          paddingX: 3,
          paddingY: "6px",
          background: "#1a6079",
          borderRadius: "8px",
          boxShadow: "none",
          fontSize: { xs: 13, sm: 14 },
          "&:hover": { background: "#154f63" },
        } }
      >
        Login
      </Button>
    );

  return (
    <>
      <header className="px-6 md:px-12 bg-white lg:py-4 py-2 custom-shadow flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="logo font-semibold text-[16px] lg:text-[18px]">
            Hire Via
          </Link>

          {/* Desktop Search */ }
          <div className="hidden lg:block">
            <div className="relative w-105">
              <input
                className="searchShadow px-6 py-3 w-full rounded-full placeholder:text-[15px] placeholder:text-black outline-none border-none"
                placeholder="Job title, keywords..."
                type="text"
                value={ query }
                onChange={ ( e ) => setQuery( e.target.value ) }
                onKeyDown={ handleKeyDown }
              />
              <button
                onClick={ handleSearch }
                className="top-1/2 -translate-y-1/2 right-2 absolute bg-[#1a6079] h-9 w-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#154f63] transition-colors"
              >
                <SearchIcon sx={ { fontSize: 20, color: "white" } } />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop right — Login or Profile */ }
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <AuthButton />
          </div>

          <IconButton
            sx={ { color: "#000", display: { lg: "none" } } }
            onClick={ () => setOpenMenu( true ) }
          >
            <SortIcon sx={ { fontSize: 26 } } />
          </IconButton>
        </div>
      </header>

      {/* Mobile Drawer */ }
      <div
        className={ `lg:hidden fixed inset-0 z-50 transition-all duration-300 ${ openMenu ? "visible" : "invisible" }` }
      >
        {/* Backdrop */ }
        <div
          className={ `absolute inset-0 bg-black/40 transition-opacity duration-300 ${ openMenu ? "opacity-100" : "opacity-0" }` }
          onClick={ () => setOpenMenu( false ) }
        />

        <div
          className={ `relative bg-white w-[78%] max-w-75 h-full p-6 overflow-y-auto shadow-lg
            flex flex-col transition-transform duration-300
            ${ openMenu ? "translate-x-0" : "-translate-x-full" }` }
        >
          {/* Close */ }
          <div className="flex justify-end mb-6">
            <button
              onClick={ () => setOpenMenu( false ) }
              className="h-8 w-8 flex justify-center items-center border border-gray-200 rounded-full"
            >
              <CloseIcon sx={ { fontSize: 16 } } />
            </button>
          </div>

          {/* Mobile Search */ }
          <div className="relative mb-6">
            <input
              className="searchShadow px-5 py-3 w-full rounded-full placeholder:text-[14px] placeholder:text-gray-400 outline-none border border-gray-200 text-[14px]"
              placeholder="Job title, keywords..."
              type="text"
              value={ query }
              onChange={ ( e ) => setQuery( e.target.value ) }
              onKeyDown={ ( e ) =>
              {
                if ( e.key === "Enter" ) { setOpenMenu( false ); handleSearch(); }
              } }
            />
            <button
              onClick={ () => { setOpenMenu( false ); handleSearch(); } }
              className="top-1/2 -translate-y-1/2 right-2 absolute bg-[#1a6079] h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"
            >
              <SearchIcon sx={ { fontSize: 18, color: "white" } } />
            </button>
          </div>

          {/* Nav Links */ }
          <nav className="flex flex-col gap-5 text-[14px] font-medium flex-1">
            { [
              { label: "Home", to: "/" },
              { label: "Find Job", to: "/jobs" },
              { label: "Employer", to: "/employer" },
              { label: "Candidate", to: "/candidate" },
              { label: "Pricing Plans", to: "/pricing" },
              { label: "Customer Care", to: "/customer-care" },
            ].map( ( link ) => (
              <Link
                key={ link.to }
                to={ link.to }
                onClick={ () => setOpenMenu( false ) }
                className={ `py-1 transition-colors ${ location.pathname === link.to ? "text-[#1a6079] font-semibold" : "text-[#333] hover:text-[#1a6079]" }` }
              >
                { link.label }
              </Link>
            ) ) }

            <Link className="text-[14px] font-medium text-[#333] flex items-center gap-1.5">
              <CallIcon sx={ { fontSize: 17, color: "#1a6079" } } />
              +91 7665407031
            </Link>
          </nav>

          {/* Mobile Auth — bottom of drawer */ }
          <div className="mt-6 pt-5 border-t border-gray-100">
            { isLoggedIn ? (
              <button
                onClick={ () => { setOpenMenu( false ); handleProfileClick(); } }
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-[14px] font-semibold text-[#1a6079] bg-[#1a6079]/8
                  hover:bg-[#1a6079]/12 transition-colors"
              >
                <AccountCircleIcon sx={ { fontSize: 22, color: "#1a6079" } } />
                View Profile
              </button>
            ) : (
              <AuthButton fullWidth />
            ) }
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;