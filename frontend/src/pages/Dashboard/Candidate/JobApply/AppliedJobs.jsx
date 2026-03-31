import React, { useEffect } from "react";
import AppliedJobCard from "./AppliedJobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../../../store/candidate/applicationSlice";

const AppliedJobs = () =>
{
  const dispatch = useDispatch();
  useEffect( () =>
  {
    const token = localStorage.getItem( "jwt" );
    if ( !token ) return;

    dispatch( fetchApplications() );
  }, [ dispatch ] );

  const { applications } = useSelector( ( state ) => state.application );

  return (
    <>
      <section className="lg:px-10 px-4 lg:pb-0 pb-12.5">
        <h2 className="lg:text-[20px] text-[16px] font-bold">Applied Jobs</h2>

        <div className="grid lg:grid-cols-2 lg:mt-10 mt-6 lg:gap-10 gap-4">
          { applications?.map( ( elem ) => (
            <AppliedJobCard job={ elem?.job } />
          ) ) }
        </div>
      </section>
    </>
  );
};

export default AppliedJobs;
