import React from "react";
import googleLogo from "../../../assets/google.png";
import adobeLogo from "../../../assets/adobe.png";
import amazonLogo from "../../../assets/amazon.png";
import microsoftLogo from "../../../assets/microsoft.png";
import indeedLogo from "../../../assets/indeed.png";
import CompanyCard from "./CompanyCard";

const companies = [
  { name: "Google", logo: googleLogo },
  { name: "Adobe", logo: adobeLogo },
  { name: "Amazon", logo: amazonLogo },
  { name: "Microsoft", logo: microsoftLogo },
  { name: "Indeed", logo: indeedLogo },
];

const FeaturedEmployers = () => {
  return (
    <>
      <section className="lg:py-[100px] py-[40px] lg:px-12 px-6">
        <div className="text-center">
          <h2 className="lg:text-[24px] text-[17px] font-semibold">
            Featured Employers
          </h2>
          <p className="lg:text-[15px] text-[10px] text-[#676666]">
            Explore top companies hiring now
          </p>
        </div>

        <div className="grid grid-cols-5 lg:mt-10 mt-7">
          {companies.map((c) => (
            <CompanyCard company={c} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedEmployers;
``;
