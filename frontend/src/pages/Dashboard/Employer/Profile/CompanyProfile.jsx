import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerProfile } from "../../../../store/employer/employerSlice";

const CompanyProfile = () =>
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect( () =>
  {
    const token = localStorage.getItem( "jwt" );
    if ( !token ) return;

    dispatch( fetchEmployerProfile() );
  }, [ dispatch ] );

  const { employer } = useSelector( ( state ) => state.employer );



  return (
    <>
      <section className="lg:px-10 px-4  lg:pb-0 pb-12.5">
        <div className="flex gap-3 items-center">
          <div className="w-22.5 h-22.5 lg:w-35 lg:h-35 rounded-full flex justify-center items-center bg-white shadow-md">
            <img
              className="lg:w-[60%] rounded-full object-contain"
              src={ employer?.company?.logoUrl }
              alt=""
            />
          </div>
          <div>
            <h3 className="lg:text-[17px] text-[14px] font-semibold">
              { employer?.company?.name }
            </h3>
            <Button
              onClick={ () => navigate( "/employer/edit-company-profile" ) }
              variant="contained"
              sx={ {
                textTransform: "capitalize",
                color: "#1a6079",
                background: "transparent",
                paddingX: { xs: "15px", md: "25px" },
                marginTop: "6px",
                paddingY: { xs: 0.5, md: 1 },
              } }
            >
              <span className="font-medium lg:text-[14px] text-[11px]">
                Edit Profile
              </span>
            </Button>
          </div>
        </div>

        <div className="border-[rgba(0,0,0,.2)] border lg:px-7 px-5 py-4 lg:py-5 mt-5 lg:mt-10 rounded-xl">
          <h3 className="font-semibold lg:text-[17px] text-[14px]">
            Company Information
          </h3>

          <div className="lg:mt-4 mt-2 lg:flex justify-between space-y-1.5 lg:space-y-0">
            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Industry
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.industry }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Company Size
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.size }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Established Year
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.foundedYear }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Website URL
              </h4>
              <p className="font-medium mt-1 lg:mt-1 lg:text-[16px] text-[13px]">
                <Link className="text-blue-500 hover:underline">
                  { employer?.company?.websiteUrl }
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-[rgba(0,0,0,.2)] border lg:px-7 px-5 py-4 lg:py-5 mt-5 lg:mt-10 rounded-xl">
          <h3 className="font-semibold lg:text-[17px] text-[14px]">
            Contact Details
          </h3>

          <div className="lg:mt-4 mt-2 lg:flex justify-between space-y-1.5 lg:space-y-0">
            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold  lg:text-[17px] text-[14px]">
                Owner Name
              </h4>
              <p className="font-medium mt-1 lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.ownerName }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold  lg:text-[17px] text-[14px]">
                Email Id
              </h4>
              <p className="font-medium mt-1 lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.ownerEmail }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)]  lg:text-[17px] text-[14px] font-semibold">
                Phone Number
              </h4>
              <p className="font-medium mt-1 lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.ownerPhoneNumber }
              </p>
            </div>
            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold  lg:text-[17px] text-[14px]">
                Location
              </h4>
              <p className="font-medium mt-1 lg:mt-1 lg:text-[16px] text-[13px]">
                { employer?.company?.location }
              </p>
            </div>
          </div>
        </div>

        <div className="border-[rgba(0,0,0,.2)] border lg:px-7 px-5 py-4 lg:py-5 mt-5 lg:mt-10 rounded-xl">
          <h3 className="font-semibold lg:text-[17px] text-[14px]">
            About Company
          </h3>

          <div className="lg:mt-4 mt-2">
            <p className="font-medium text-[rgba(0,0,0,.5)] text-[11px] lg:text-[15px]">
              { employer?.company?.description }
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyProfile;
