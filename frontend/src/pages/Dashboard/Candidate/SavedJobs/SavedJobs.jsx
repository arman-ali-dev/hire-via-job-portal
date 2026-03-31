import React, { useEffect } from "react";
import JobCard from "../../../Job/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedJobs } from "../../../../store/candidate/saveJobSlice";

const SavedJobs = () =>
{
  const dispatch = useDispatch();
  useEffect( () =>
  {
    const token = localStorage.getItem( "jwt" );
    if ( !token ) return;

    dispatch( fetchSavedJobs() );
  }, [ dispatch ] );

  const { savedJobs } = useSelector( ( state ) => state.saveJob );

  return (
    <>
      <section className="lg:px-10  px-4  lg:pb-0 pb-12.5">
        <h2 className="lg:text-[20px] text-[16px] font-bold">Saved Jobs</h2>

        <div className="grid lg:grid-cols-2 lg:mt-10 mt-6 lg:gap-10 gap-4">
          { savedJobs?.map( ( elem ) => (
            <JobCard job={ elem?.job } />
          ) ) }
        </div>
      </section>
    </>
  );
};

export default SavedJobs;
