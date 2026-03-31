import React, { useEffect } from "react";
import HeroSection from "./Hero/HeroSection";
import ExploreSteps from "./Steps/ExploreSteps";
import RegisterBanner from "./RegisterBanner/RegisterBanner";
import Categories from "./Category/Categories";
import LatestJobs from "./LatestJobs/LatestJobs";
import FeaturedEmployers from "./FeaturedEmployers/FeaturedEmployers";
import Testimonials from "./Testimonials/Testimonials";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../../store/candidate/jobSlice";
import { fetchUserProfile } from "../../store/candidate/userSlice";
import { fetchCategories } from "../../store/candidate/categorySlice";
import { fetchCompanies } from "../../store/candidate/companySlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    dispatch(fetchJobs());
    dispatch(fetchUserProfile());
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <Categories />
      <LatestJobs />
      <ExploreSteps />
      <RegisterBanner />
      <FeaturedEmployers />
      <Testimonials />
    </>
  );
};

export default Home;
