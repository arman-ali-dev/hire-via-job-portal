import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FilterAsideBar from "./FilterAsideBar";
import JobListings from "./JobListings";
import { searchJobs } from "../../store/candidate/jobSlice";

const FindJob = () =>
{
  const dispatch = useDispatch();
  const [ searchParams, setSearchParams ] = useSearchParams();

  const [ openSlideBar, setOpenSlideBar ] = useState( false );
  const [ keyword, setKeyword ] = useState( searchParams.get( "search" ) || "" );
  const [ location, setLocation ] = useState( searchParams.get( "location" ) || "" );

  useEffect( () =>
  {
    const urlKeyword = searchParams.get( "search" ) || "";
    const urlLocation = searchParams.get( "location" ) || "";

    if ( urlKeyword )
    {
      setKeyword( urlKeyword );
      setLocation( urlLocation );
      dispatch( searchJobs( { keyword: urlKeyword, location: urlLocation } ) );
    }
  }, [ searchParams ] );

  const handleSearch = () =>
  {
    const trimmedKeyword = keyword.trim();
    const trimmedLocation = location.trim();

    if ( !trimmedKeyword ) return;

    const params = {};
    if ( trimmedKeyword ) params.search = trimmedKeyword;
    if ( trimmedLocation ) params.location = trimmedLocation;
    setSearchParams( params );

    dispatch( searchJobs( { keyword: trimmedKeyword, location: trimmedLocation } ) );
  };

  const handleKeyDown = ( e ) =>
  {
    if ( e.key === "Enter" )
    {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <section
        id="hero-section"
        className="bg-[#f5f5f5] pb-7.5 pt-15 lg:pt-27.5 px-4 lg:px-12"
      >
        <div className="text-center">
          <h1 className="lg:text-[36px] text-[18px] font-medium">
            Search & Apply for Your Next{ " " }
            <span className="text-(--primary-color)">Opportunity</span>
          </h1>

          <p className="text-[#676666] lg:w-[60%] lg:text-[16px] text-[9px] mx-auto mt-1">
            Discover thousands of job openings tailored to your skills and
            interests. Easily filter by role, location, or industry to find the
            perfect match. Connect with top employers and take the next step
            towards your career goals.
          </p>

          <div className="formShadow lg:flex relative justify-between items-center w-full lg:w-[55%] px-3 lg:px-11 mx-auto mt-5 lg:h-17.5 rounded-lg bg-white">

            <div className="text-left relative h-13.75 pl-4 lg:pl-0 flex lg:block items-center lg:h-auto">
              <input
                type="text"
                value={ keyword }
                onChange={ ( e ) => setKeyword( e.target.value ) }
                onKeyDown={ handleKeyDown }
                placeholder="Search title, keywords..."
                className="lg:placeholder:text-[14px] placeholder:text-[12px] lg:text-[14px] text-[12px] w-full lg:w-auto placeholder:text-black outline-none border-none bg-transparent"
              />
              <SearchIcon
                sx={ {
                  fontSize: { xs: 15, md: 18 },
                  position: "absolute",
                  left: { xs: -4, md: -23 },
                  top: { xs: 20, md: 3 },
                  color: "#9ca3af",
                } }
              />
            </div>

            <div className="text-left relative pl-4 lg:pl-0 lg:borderLine h-5 flex lg:block items-center lg:h-auto">
              <input
                type="text"
                value={ location }
                onChange={ ( e ) => setLocation( e.target.value ) }
                onKeyDown={ handleKeyDown }
                placeholder="Your Location"
                className="lg:placeholder:text-[14px] placeholder:text-[12px] lg:text-[14px] text-[12px] placeholder:text-black outline-none border-none bg-transparent"
              />
              <LocationOnOutlinedIcon
                sx={ {
                  fontSize: { xs: 15, md: 18 },
                  position: "absolute",
                  left: { xs: -4, md: -23 },
                  top: { xs: 2, md: 3 },
                  color: "#9ca3af",
                } }
              />
            </div>

            <div className="lg:mt-0 lg:pb-0 mt-5 pb-3">
              <Button
                fullWidth
                variant="contained"
                onClick={ handleSearch }
                sx={ {
                  textTransform: "capitalize",
                  paddingX: 3,
                  paddingY: "6px",
                  background: "#1a6079",
                  fontSize: { xs: 11, md: 13 },
                  "&:hover": { background: "#154f63" },
                } }
              >
                <span className="font-medium">Find Job</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="lg:px-12 px-6 py-10 lg:py-25">
        <IconButton
          onClick={ () => setOpenSlideBar( true ) }
          sx={ { border: "1px solid #afafaf" } }
        >
          <SortIcon sx={ { fontSize: 17 } } />
        </IconButton>
        <div className="flex gap-12 mt-6">
          <FilterAsideBar
            openSlideBar={ openSlideBar }
            setOpenSlideBar={ setOpenSlideBar }
          />
          <JobListings />
        </div>
      </div>
    </>
  );
};

export default FindJob;