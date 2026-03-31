import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Software Engineer — Hired via HireVia",
    rating: 5,
    review:
      "HireVia completely transformed my job search. Within two weeks I had three interviews lined up, and I landed my dream role at a top tech firm. The platform is intuitive and the job matches were incredibly accurate.",
    avatar: null,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Designer — Found on HireVia",
    rating: 4.5,
    review:
      "As a designer, finding the right company culture matters as much as the role itself. HireVia's detailed company profiles helped me find exactly what I was looking for. Highly recommend to anyone in creative fields.",
    avatar: null,
  },
  {
    id: 3,
    name: "Rohit Verma",
    role: "HR Manager — TechSolutions Pvt Ltd",
    rating: 5,
    review:
      "We've been using HireVia to source candidates for over a year. The quality of applicants is outstanding. The filtering tools save us hours every week, and we've made some of our best hires through this platform.",
    avatar: null,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Data Analyst — Placed through HireVia",
    rating: 4.5,
    review:
      "I was skeptical at first, but HireVia delivered. The search filters are powerful and the application process is seamless. I got a call from a recruiter within 48 hours of updating my profile. Fantastic experience!",
    avatar: null,
  },
  {
    id: 5,
    name: "Karan Singh",
    role: "Full Stack Developer — Hired via HireVia",
    rating: 5,
    review:
      "The trending job tags and smart keyword search helped me discover roles I hadn't even considered. I ended up in a position that pays 40% more than my previous job. HireVia is a game changer.",
    avatar: null,
  },
  {
    id: 6,
    name: "Anjali Nair",
    role: "Marketing Lead — Recruited via HireVia",
    rating: 4,
    review:
      "Clean interface, genuine listings, and a fast application flow. What sets HireVia apart is that every job I applied to actually had a real response. No ghosting, no spam — just real opportunities.",
    avatar: null,
  },
];

const Testimonials = () =>
{
  return (
    <section className="lg:px-12 px-6 pb-15 lg:pb-27.5 pt-4">

      <div className="text-center mb-8 lg:mb-14">
        <p className="text-[11px] lg:text-[13px] font-semibold text-[#1a6079] uppercase tracking-widest mb-2">
          Testimonials
        </p>
        <h2 className="lg:text-[28px] text-[20px] font-bold text-[#1a1a1a]">
          What Our Users Are Saying
        </h2>
        <p className="text-[#676666] text-[11px] lg:text-[14px] mt-2 max-w-md mx-auto">
          Real stories from candidates and employers who found success with HireVia.
        </p>
      </div>

      <Swiper
        slidesPerView={ 1 }
        spaceBetween={ 20 }
        pagination={ { clickable: true } }
        autoplay={ { delay: 4000, disableOnInteraction: false } }
        modules={ [ Pagination, Autoplay ] }
        breakpoints={ {
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        } }
        className="pb-12 lg:pb-14"
      >
        { TESTIMONIALS.map( ( t ) => (
          <SwiperSlide key={ t.id } className="h-auto">
            <TestimonialCard
              name={ t.name }
              role={ t.role }
              rating={ t.rating }
              review={ t.review }
              avatar={ t.avatar }
            />
          </SwiperSlide>
        ) ) }
      </Swiper>
    </section>
  );
};

export default Testimonials;