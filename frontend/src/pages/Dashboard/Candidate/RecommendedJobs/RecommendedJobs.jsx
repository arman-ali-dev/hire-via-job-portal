import React, { useEffect } from "react";
import JobCard from "../../../Job/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedJobs } from "../../../../store/candidate/recommendedJobsSlice";

const RecommendedJobs = () =>
{
  const dispatch = useDispatch();

  useEffect( () =>
  {
    const token = localStorage.getItem( "jwt" );
    if ( !token ) return;

    dispatch( fetchRecommendedJobs() );
  }, [ dispatch ] );

  const { recommendedJobs } = useSelector( ( state ) => state.recommendedJobs );

  return (
    <>
      <section className="lg:px-10 px-4 pb-12.5 lg:pb-0">
        <h2 className="lg:text-[20px] text-[16px] font-bold">
          Recommended Jobs
        </h2>

        <div className="grid lg:grid-cols-2 lg:mt-10 mt-6 gap-4 lg:gap-10">
          { recommendedJobs?.map( ( j ) => (
            <JobCard job={ j } />
          ) ) }
        </div>
      </section>
    </>
  );
};

export default RecommendedJobs;
