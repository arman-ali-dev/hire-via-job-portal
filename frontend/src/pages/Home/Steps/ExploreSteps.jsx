import React from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const ExploreSteps = () =>
{
  return (
    <>
      <section className="lg:px-12 px-6 pb-10 lg:pb-25">
        <div className="text-center">
          <h2 className="lg:text-[24px] text-[17px] font-semibold">
            How It <span className="text-(--primary-color)">Works</span>
          </h2>
          <p className="lg:text-[15px] text-[10px] text-[#676666]">
            Explore the following these steps will help you to find a job easily
          </p>
        </div>

        <div className="grid grid-cols-3 mt-8">
          <div className="col-span-1 relative text-center">
            <div className="bg(--primary-color) mx-auto w-10 lg:w-17.5 h-10 lg:h-17.5 text-white lg:text-[32px] text-[18px] rounded-full flex justify-center items-center">
              1
            </div>

            <div className="mt-2">
              <h2 className="font-medium text-[11px] lg:text-[19px]">
                Register Account
              </h2>
              <p className="lg:text-[15px] text-[7px] text-[#676666]">
                First, you need to make a account.
              </p>
            </div>

            <div className="bg-[rgba(132,220,255,.5)] absolute top-4 right-0 translate-x-1/2 h-5 lg:h-8.75 flex justify-center items-center w-5 lg:w-8.75 rounded-full">
              <ArrowForwardOutlinedIcon
                sx={ { fontSize: { xs: 10, md: 16 } } }
                className="text-(--primary-color)"
              />
            </div>
          </div>

          <div className="col-span-1 relative text-center">
            <div className="bg-[rgba(132,220,255,.5)] mx-auto w-10 lg:w-17.5 h-10 lg:h-17.5 text-(--primary-color) lg:text-[32px] text-[18px] rounded-full flex justify-center items-center">
              2
            </div>

            <div className="mt-2">
              <h2 className="font-medium text-[11px] lg:text-[19px]">
                Find Job
              </h2>
              <p className="lg:text-[15px] text-[7px] text-[#676666]">
                Second, search for the job you want.
              </p>
            </div>

            <div className="bg-[rgba(132,220,255,.5)] absolute top-4 right-0 translate-x-1/2 h-5 lg:h-8.75 flex justify-center items-center w-5 lg:w-8.75 rounded-full">
              <ArrowForwardOutlinedIcon
                sx={ { fontSize: { xs: 10, md: 16 } } }
                className="text-(--primary-color)"
              />
            </div>
          </div>

          <div className="col-span-1 text-center">
            <div className="bg-(--primary-color) mx-auto  w-10 lg:w-17.5 h-10 lg:h-17.5 text-white lg:text-[32px] text-[18px] rounded-full flex justify-center items-center">
              3
            </div>

            <div className="mt-2">
              <h2 className="font-medium text-[11px] lg:text-[19px]">
                Apply Job
              </h2>

              <p className="lg:text-[15px] text-[7px] text-[#676666]">
                Third, apply to the company and want it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreSteps;
