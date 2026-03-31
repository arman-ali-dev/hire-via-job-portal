import React from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { removeSaveJob, saveJob } from "../../store/candidate/saveJobSlice";

const JobCard = ( { job } ) =>
{
  const getDaysLeft = ( createdAt ) =>
  {
    const postedDate = new Date( createdAt );
    const expiryDate = new Date( postedDate );
    expiryDate.setDate( expiryDate.getDate() + 30 );
    const diffTime = expiryDate - new Date();
    const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );
    return diffDays > 0 ? diffDays : 0;
  };

  const dispatch = useDispatch();
  const { savedJobs, saveJobId, removeSaveJobId } = useSelector(
    ( state ) => state.saveJob,
  );
  const isSaved = savedJobs?.find( ( elem ) => elem.job?.id === job?.id );

  const handleBookmark = ( e ) =>
  {
    e.preventDefault();
    isSaved ? dispatch( removeSaveJob( isSaved?.id ) ) : dispatch( saveJob( job?.id ) );
  };

  const daysLeft = getDaysLeft( job?.createdAt );
  const isExpiringSoon = daysLeft <= 5;

  const avatarColors = [ "#1a6079", "#0e4d63", "#1a7a5e", "#2d6a8f", "#16536b" ];
  const avatarBg =
    avatarColors[
    ( job?.company?.name?.charCodeAt( 0 ) || 0 ) % avatarColors.length
    ];

  return (
    <Link to={ `/job-details/${ job?.id }` } className="col-span-1 block group">
      <div
        className="relative bg-white border border-[#e8e8e8] rounded-2xl px-5 py-5 lg:px-6 lg:py-6 h-full
        transition-all duration-300 ease-out
        hover:border-[#1a6079]/30 hover:shadow-[0_8px_30px_rgba(26,96,121,0.12)]
        hover:-translate-y-0.5"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 lg:w-13 lg:h-13 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={ { background: avatarBg } }
            >
              <span
                className="text-white text-[18px] lg:text-[22px] leading-none select-none"
                style={ { fontFamily: "'Lily Script One', cursive" } }
              >
                { job?.company?.name?.charAt( 0 ) }
              </span>
            </div>

            <div>
              <p className="text-[11px] lg:text-[12px] text-[#9a9a9a] leading-none mb-0.5">
                { job?.company?.name }
              </p>
              <span className="text-[10px] lg:text-[11px] font-medium text-[#1a6079] bg-[#1a6079]/8 px-2 py-0.5 rounded-md">
                { job?.category?.name || "General" }
              </span>
            </div>
          </div>

          <IconButton
            size="small"
            disabled={ saveJobId === job?.id || removeSaveJobId === isSaved?.id }
            onClick={ handleBookmark }
            sx={ {
              color: isSaved ? "#1a6079" : "#c0c0c0",
              "&:hover": { color: "#1a6079", background: "#1a6079/8" },
              transition: "color 0.2s",
              mt: -0.5,
              mr: -0.5,
            } }
          >
            { saveJobId === job?.id || removeSaveJobId === isSaved?.id ? (
              <CircularProgress size={ 16 } sx={ { color: "#1a6079" } } />
            ) : isSaved ? (
              <BookmarkIcon sx={ { fontSize: { xs: 18, md: 22 } } } />
            ) : (
              <BookmarkBorderOutlinedIcon
                sx={ { fontSize: { xs: 18, md: 22 } } }
              />
            ) }
          </IconButton>
        </div>

        <h2
          className="text-[15px] lg:text-[18px] font-semibold text-[#1a1a1a] leading-snug mb-4
          group-hover:text-[#1a6079] transition-colors duration-200 line-clamp-2"
        >
          { job?.title }
        </h2>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className="inline-flex items-center gap-1 text-[10px] lg:text-[12px] font-medium
            text-[#555] bg-[#f4f4f4] rounded-lg py-1 px-2.5 lg:px-3"
          >
            <AccessTimeOutlinedIcon sx={ { fontSize: { xs: 11, md: 13 } } } />
            { job?.timing?.replaceAll( "_", " " ) }
          </span>

          <span
            className="inline-flex items-center gap-1 text-[10px] lg:text-[12px] font-medium
            text-[#1a6079] bg-[#1a6079]/8 rounded-lg py-1 px-2.5 lg:px-3"
          >
            <LocationOnOutlinedIcon sx={ { fontSize: { xs: 11, md: 13 } } } />
            { job?.company?.location }
          </span>

          <span
            className="inline-flex items-center gap-1 text-[10px] lg:text-[12px] font-medium
            text-[#555] bg-[#f4f4f4] rounded-lg py-1 px-2.5 lg:px-3"
          >
            { job?.avgSalary }
          </span>
        </div>

        <div className="border-t border-dashed border-[#ebebeb] mb-4" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div
              className={ `w-1.5 h-1.5 rounded-full ${ isExpiringSoon ? "bg-red-400" : "bg-emerald-400" }` }
            />
            <p
              className={ `text-[10px] lg:text-[12px] font-medium ${ isExpiringSoon ? "text-red-500" : "text-[#7A7979]" }` }
            >
              { daysLeft > 0 ? (
                <>
                  <span
                    className={ `${ isExpiringSoon ? "text-red-500" : "text-[#1a6079]" } font-semibold` }
                  >
                    { daysLeft }
                  </span>{ " " }
                  days left
                </>
              ) : (
                <span className="text-red-500">Expired</span>
              ) }
            </p>
          </div>

          <span
            className="text-[10px] lg:text-[11px] text-[#1a6079] font-semibold
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
