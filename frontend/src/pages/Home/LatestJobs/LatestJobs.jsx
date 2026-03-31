import React from "react";
import { Link } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import JobCard from "../../Job/JobCard";
import { useSelector } from "react-redux";

const LatestJobs = () =>
{
  const { jobs } = useSelector( ( state ) => state.job );

  return (
    <>
      <section className="lg:px-12 px-6  py-7.5 lg:py-20">
        <div className="flex justify-between items-center ">
          <div>
            <h2 className="lg:text-[24px] text-[16px] font-semibold">
              Latest Jobs
            </h2>
            <p className="lg:text-[15px] text-[11px] text-[#676666]">
              2020 jobs live - 2025 added today
            </p>
          </div>
          <div>
            <Link className="text-(--primary-color) font-medium text-[11px] lg:text-[15px]">
              View All Jobs
              <ChevronRightOutlinedIcon sx={ { fontSize: 20 } } />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Swiper
            modules={ [ Navigation ] }
            spaceBetween={ 20 }
            slidesPerView={ 1 }
            breakpoints={ {
              640: { slidesPerView: 1 }, // mobile
              768: { slidesPerView: 2 }, // tablet
              1024: { slidesPerView: 3 }, // desktop
            } }
          >
            { jobs?.map( ( j, index ) => (
              <SwiperSlide key={ index }>
                <JobCard job={ j } />
              </SwiperSlide>
            ) ) }
          </Swiper>
        </div>

        <div className="mt-5">
          <Swiper
            modules={ [ Navigation ] }
            spaceBetween={ 20 }
            slidesPerView={ 1 }
            breakpoints={ {
              640: { slidesPerView: 1 }, // mobile
              768: { slidesPerView: 2 }, // tablet
              1024: { slidesPerView: 3 }, // desktop
            } }
          >
            { jobs?.map( ( j, index ) => (
              <SwiperSlide key={ index }>
                <JobCard job={ j } />
              </SwiperSlide>
            ) ) }
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default LatestJobs;
