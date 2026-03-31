import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const AppliedJobCard = ( { job } ) =>
{
  const navigate = useNavigate()


  const getDaysLeft = ( createdAt ) =>
  {
    const postedDate = new Date( createdAt );
    const expiryDate = new Date( postedDate );
    expiryDate.setDate( expiryDate.getDate() + 30 );

    const today = new Date();

    const diffTime = expiryDate - today;
    const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );

    return diffDays > 0 ? diffDays : 0;
  };
  return (
    <>
      <div onClick={ () => navigate( `/job-details/${ job?.id }` ) } className="col-span-1 cursor-pointer border-[#DDD7D7] block border rounded-xl lg:px-7 px-4 py-4 lg:py-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="lg:text-[19px] text-[14px] font-medium">
              { job?.title }
            </h2>
            <p className="lg:text-[14px] text-[10px] -mt-0.5">
              <span className="text-[#7A7979]">by</span> { job?.company?.name }{ " " }
              <span className="text-[#7A7979]">in</span>{ " " }
              <span className="text-(--primary-color)">
                { " " }
                { job?.category?.name || "Category" }
              </span>
            </p>
          </div>
          <div>
            <div className="bg-(--primary-color) lg:w-17 lg:h-17 w-11.25 h-11.25 rounded-full flex justify-center items-center lg:mt-4">
              <span
                className="text-white text-[20px] lg:text-[40px]"
                style={ {
                  fontFamily: "Lily Script One",
                  systemUi: "Lily Script One",
                } }
              >
                { job?.company?.name?.charAt( 0 ) }
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:gap-4 gap-2 mt-4">
          <span
            className="text-[#676666] font-medium text-[8px] lg:text-[12px] bg-[#E6E4E4]
           rounded-lg py-1.25 px-3 lg:px-4"
          >
            { job?.timing?.replaceAll( "_", " " ) }
          </span>

          <span className="text-(--primary-color)  font-medium text-[8px] lg:text-[12px] bg-[#E6E4E4] rounded-lg py-1.25 px-3 lg:px-4">
            <LocationOnOutlinedIcon
              sx={ { fontSize: { xs: 11, md: 14 }, verticalAlign: "text-top" } }
            />{ " " }
            { job?.company?.location }
          </span>

          <span className="text-(--primary-color) text-[8px] lg:text-[12px] font-medium bg-[#E6E4E4] rounded-lg py-1.25 px-3 lg:px-4">
            { job?.avgSalary }
          </span>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-[10px] lg:text-[13px] text-[#7A7979]">
              <span className="text-(--primary-color)">
                { " " }
                { getDaysLeft( job?.createdAt ) }
              </span>{ " " }
              days left to apply
            </p>
          </div>

          <div>
            <p className="lg:text-[13px] text-[10px] text-(--primary-color) font-semibold">
              Applied
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedJobCard;
