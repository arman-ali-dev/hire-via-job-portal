import Button from "@mui/material/Button";
import React from "react";
import careerGrowthBanner from "../../../assets/career-growth-banner.png";

const RegisterBanner = () => {
  return (
    <>
      <section className="lg:py-[80px] py-[30px] overflow-hidden relative px-6 lg:px-12 bg-[var(--primary-color)]">
        <div className="grid lg:grid-cols-5">
          <div className="col-span-3  lg:pr-[180px]">
            <h2 className="text-white lg:text-[28px] text-[18px] font-medium">
              Ready to find your dream job? Create your profile today!
            </h2>
            <p className="text-white text-[10px] lg:text-[14px] mt-1 mb-4">
              Stand out in today’s competitive market. Highlight your skills,
              get noticed by leading companies, and unlock new opportunities.
              Start building your future now.
            </p>

            <Button
              size="small"
              sx={{
                textTransform: "capitalize",
                color: "#1a6079",
                backgroundColor: "#fff",
                paddingX: { xs: 2, md: 3 },
              }}
            >
              <span className="font-medium text-[11px] lg:text-[14px]">
                Register Now
              </span>
            </Button>
          </div>

          <div className="absolute -bottom-0 right-10">
            <img
              className="lg:w-[150px] w-[90px]"
              src={careerGrowthBanner}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterBanner;
