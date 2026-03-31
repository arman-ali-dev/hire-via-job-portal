import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Button from "@mui/material/Button";
import { searchJobs } from "../../../store/candidate/jobSlice";

const TRENDING = [ "React Developer", "UI/UX Designer", "Data Analyst", "Node.js", "Product Manager" ];

const HeroSection = () =>
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ keyword, setKeyword ] = useState( "" );
  const [ location, setLocation ] = useState( "" );

  const handleSearch = ( kw = keyword ) =>
  {
    const trimmedKeyword = kw.trim();
    const trimmedLocation = location.trim();
    if ( !trimmedKeyword ) return;
    dispatch( searchJobs( { keyword: trimmedKeyword, location: trimmedLocation } ) );
    navigate(
      `/jobs?search=${ encodeURIComponent( trimmedKeyword ) }&location=${ encodeURIComponent( trimmedLocation ) }`
    );
  };

  const handleKeyDown = ( e ) =>
  {
    if ( e.key === "Enter" ) { e.preventDefault(); handleSearch(); }
  };

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-[#f0f7fa] pb-12.5 pt-17.5 lg:pt-30 px-4 lg:px-12"
    >
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#1a6079]/8 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 w-96 h-96 rounded-full bg-[#1a6079]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-32 rounded-full bg-[#1a6079]/6 blur-2xl" />

      <div className="relative text-center max-w-5xl mx-auto">

        <div className="inline-flex items-center gap-2 bg-white border border-[#1a6079]/20 text-[#1a6079]
          text-[11px] lg:text-[13px] font-medium px-4 py-1.5 rounded-full shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a6079] animate-pulse" />
          10,000+ Jobs Available Right Now
        </div>

        <h1 className="text-[26px] sm:text-[32px] lg:text-[46px] font-bold text-[#1a1a1a] leading-tight mb-4">
          Find a job that suits your{ " " }
          <span className="relative inline-block">
            <span className="text-[#1a6079]">interest</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.75 rounded-full bg-[#1a6079]/30" />
          </span>
          { " " }&{ " " }
          <span className="text-[#1a6079]">Skills</span>
        </h1>

        <p className="text-[#676666] lg:w-[60%] lg:text-[15px] text-[12px] mx-auto mb-8 leading-relaxed">
          Discover thousands of opportunities across industries, connect with
          top employers, and take the next step towards your dream career.
        </p>

        <div
          className="bg-white rounded-2xl lg:rounded-full mx-auto w-full lg:w-[72%]
            px-4 lg:px-5 py-3 lg:py-2
            flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-0
            border border-[#e8e8e8] shadow-[0_4px_24px_rgba(26,96,121,0.10)]"
        >
          <div className="flex items-center gap-2.5 flex-1 px-1 lg:px-2">
            <SearchIcon sx={ { fontSize: 20, color: "#1a6079", flexShrink: 0 } } />
            <input
              type="text"
              value={ keyword }
              onChange={ ( e ) => setKeyword( e.target.value ) }
              onKeyDown={ handleKeyDown }
              placeholder="Job title, keywords..."
              className="w-full text-[13px] lg:text-[14px] placeholder:text-[#b8b8b8] text-[#1a1a1a] outline-none border-none bg-transparent"
            />
          </div>

          <div className="hidden lg:block w-px h-6 bg-[#e4e4e4] mx-2 shrink-0" />

          <div className="flex items-center gap-2.5 flex-1 px-1 lg:px-2">
            <LocationOnOutlinedIcon sx={ { fontSize: 20, color: "#1a6079", flexShrink: 0 } } />
            <input
              type="text"
              value={ location }
              onChange={ ( e ) => setLocation( e.target.value ) }
              onKeyDown={ handleKeyDown }
              placeholder="City, state or remote..."
              className="w-full text-[13px] lg:text-[14px] placeholder:text-[#b8b8b8] text-[#1a1a1a] outline-none border-none bg-transparent"
            />
          </div>

          <Button
            variant="contained"
            onClick={ () => handleSearch() }
            sx={ {
              textTransform: "capitalize",
              background: "#1a6079",
              borderRadius: { xs: "10px", lg: "50px" },
              px: { xs: 3, lg: 4 },
              py: { xs: 1, lg: 1.3 },
              fontSize: { xs: 13, md: 14 },
              fontWeight: 600,
              flexShrink: 0,
              boxShadow: "none",
              "&:hover": {
                background: "#154f63",
                boxShadow: "0 4px 14px rgba(26,96,121,0.3)",
              },
              transition: "all 0.2s",
            } }
          >
            Find Job
          </Button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-[11px] lg:text-[12px] text-[#9a9a9a]">
            <TrendingUpIcon sx={ { fontSize: 14, color: "#1a6079" } } />
            <span>Trending:</span>
          </div>
          { TRENDING.map( ( tag ) => (
            <button
              key={ tag }
              onClick={ () => { setKeyword( tag ); handleSearch( tag ); } }
              className="text-[11px] lg:text-[12px] text-[#1a6079] bg-white border border-[#1a6079]/20
                px-3 py-0.5 rounded-full cursor-pointer
                hover:bg-[#1a6079] hover:text-white hover:border-[#1a6079]
                transition-all duration-200"
            >
              { tag }
            </button>
          ) ) }
        </div>

      </div>
    </section>
  );
};

export default HeroSection;