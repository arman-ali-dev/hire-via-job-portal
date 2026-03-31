import React, { useEffect } from "react";
import microsoftLogo from "../../assets/microsoft.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJobDetails,
  fetchJobDetails,
} from "../../store/candidate/jobSlice";
import AboutJob from "./AboutJob";
import JobSummaryCard from "./JobSummaryCard";
import Button from "@mui/material/Button";
import { removeSaveJob, saveJob } from "../../store/candidate/saveJobSlice";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CircularProgress from "@mui/material/CircularProgress";

const JobDetails = () => {
  const query = useParams();
  const id = query.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobDetails(id));

    return () => {
      dispatch(clearJobDetails());
    };
  }, [id]);

  const { jobDetails } = useSelector((state) => state.job);

  const timeAgo = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMinutes > 0)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const { applications } = useSelector((state) => state.application);
  const isApplied = applications?.find(
    (elem) => elem.job?.id === jobDetails?.id
  );

  const { savedJobs, saveJobId, removeSaveJobId } = useSelector(
    (state) => state.saveJob
  );
  const isSaved = savedJobs?.find((elem) => elem.job?.id === jobDetails?.id);
  console.log("saved: ", isSaved);

  const handleBookmark = () => {
    isSaved
      ? dispatch(removeSaveJob(isSaved?.id))
      : dispatch(saveJob(jobDetails?.id));
    console.log(saveJobId);
  };

  return (
    <>
      <section className="lg:px-12 px-6 pt-2.5 pb-10 lg:py-12.5">
        <div className="lg:flex justify-between items-end">
          <div>
            <div
              className="lg:w-22.5 lg:h-22.5 w-17.5 h-17.5 rounded-full shadow-lg flex justify-center
                 items-center"
            >
              <img
                src={microsoftLogo}
                className="lg:w-11.25 lg:h-11.25 w-7.5 h-7.5"
                alt=""
              />
            </div>

            <div className="mt-2">
              <h3 className="lg:text-[18px]  text-[15px] font-bold ">
                {jobDetails?.title}
              </h3>
              <p className="opacity-70 text-[12px] lg:text-[14px]">
                {jobDetails?.company?.name}
              </p>
              <p className="opacity-60 text-[10px] lg:text-[12px]">
                {jobDetails?.company?.location} •{" "}
                {timeAgo(jobDetails?.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-5 lg:mt-0">
            <Button
              disabled={saveJobId || removeSaveJobId}
              onClick={handleBookmark}
              sx={{
                backgroundColor: "rgba(0,123,255,0.1)",
                color: "#000",
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "8px",
                padding: { xs: "6px 12px", md: "8px 24px" },
                fontSize: { xs: "11px", md: "15px" },
                mr: 2,
                "&:hover": {
                  backgroundColor: "rgba(0,123,255,0.18)",
                },
              }}
            >
              {saveJobId ? (
                <CircularProgress color="black" size={13} />
              ) : removeSaveJobId ? (
                <CircularProgress color="black" size={13} />
              ) : isSaved ? (
                <>
                  <BookmarkIcon
                    sx={{
                      fontSize: { xs: 14, md: 18 },
                      verticalAlign: "sub",
                      mr: "4px",
                    }}
                  />
                  Saved
                </>
              ) : (
                <>
                  <BookmarkBorderIcon
                    sx={{
                      fontSize: { xs: 14, md: 18 },
                      verticalAlign: "sub",
                      mr: "4px",
                    }}
                  />
                  Save
                </>
              )}
            </Button>

            <Button
              onClick={() => navigate(`/job-apply/${id}`)}
              disabled={isApplied}
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "8px",
                padding: { xs: "6px 12px", md: "8px 24px" },
                fontSize: { xs: "11px", md: "15px" },
                mr: 2,

                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                  opacity: 0.9,
                },

                "&.Mui-disabled": {
                  backgroundColor: "var(--primary-color)",
                  opacity: 0.5,
                  color: "#fff",
                  cursor: "not-allowed",
                },
              }}
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
          </div>
        </div>

        <div className="lg:mt-20 mt-8 grid lg:grid-cols-3 lg:gap-16">
          <AboutJob
            description={jobDetails?.description}
            responsibilities={jobDetails?.responsibilities}
            requiredSkills={jobDetails?.requiredSkills}
          />

          <JobSummaryCard job={jobDetails} />
        </div>

        <div className="lg:mt-20 mt-10">
          <h3 className="lg:text-[18px] text-[15px] font-bold">
            About Company
          </h3>
          <div className="flex gap-4 items-center mt-4">
            <div
              className="lg:w-20 lg:h-20 w-15 h-15 rounded-full shadow-lg flex justify-center
           items-center"
            >
              <img
                src={microsoftLogo}
                className="lg:w-8.75 lg:h-8.75 w-6.25 h-6.25"
                alt=""
              />
            </div>
            <div className="mt-2">
              <h3 className="lg:text-[18px] text-[15px] font-bold ">
                {jobDetails?.company?.name}
              </h3>
              <p className="opacity-70 text-[12px] lg:text-[14px]">
                {jobDetails?.company?.location}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="lg:text-[14px] text-[10px] opacity-60  font-medium ">
              {jobDetails?.description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
