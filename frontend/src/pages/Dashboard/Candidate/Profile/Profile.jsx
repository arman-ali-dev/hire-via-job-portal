import React from "react";
import userImage from "../../../../assets/user.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () =>
{
  const navigate = useNavigate();
  const { user } = useSelector( ( state ) => state.user );
  return (
    <>
      <section className="lg:px-10 px-4  lg:pb-0 pb-12.5">
        <div className="flex gap-3 items-center">
          <div className="w-22.5 h-22.5 lg:w-35 lg:h-35 rounded-full flex justify-center items-center bg-white shadow-md">
            <img
              className="w-[90%] rounded-full"
              src={ user?.profilePicture || userImage }
              alt=""
            />
          </div>
          <div>
            <h3 className="lg:text-[17px] text-[14px] font-semibold">
              { user?.fullName }
            </h3>
            <Button
              onClick={ () => navigate( "/profile/edit" ) }
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
            Personal Info
          </h3>

          <div className="lg:mt-4 mt-2 lg:flex justify-between space-y-1.5 lg:space-y-0">
            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Full Name
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                { user?.fullName }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Email
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                { user?.email }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Phone
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                +91 { user?.phoneNumber }
              </p>
            </div>

            <div className="flex lg:block gap-2">
              <h4 className="text-[rgba(0,0,0,.7)] font-semibold lg:text-[16px] text-[13px]">
                Location
              </h4>
              <p className="font-medium lg:mt-1 lg:text-[16px] text-[13px]">
                { user?.location }
              </p>
            </div>
          </div>
        </div>

        <div className="border-[rgba(0,0,0,.2)] border lg:px-7 px-6 py-4 lg:py-5 mt-4 lg:mt-8 rounded-xl">
          <h3 className="font-semibold lg:text-[17px] text-[14px]">Skills</h3>

          <ul className="lg:mt-4 mt-2 flex flex-wrap gap-2 lg:text-[13px] text-[10px] lg:gap-4">
            { user?.skills?.map( ( s ) => (
              <li className=" text-[#626262] mt-1 bg-[rgba(0,123,255,0.1)]  font-medium py-1 px-4 lg:px-6 rounded-lg inline-block">
                { s }
              </li>
            ) ) }
          </ul>
        </div>
        <div className="border-[rgba(0,0,0,.2)] border lg:px-7 px-6 py-4 lg:py-5 lg:mt-8 mt-4 rounded-xl">
          <h3 className="font-semibold lg:text-[17px] text-[14px]">Bio</h3>

          <div className="lg:mt-4 mt-2">
            <p className="font-medium text-[rgba(0,0,0,.5)] text-[10px] lg:text-[15px]">
              { user?.bio }
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
