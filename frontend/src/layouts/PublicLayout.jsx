import React from "react";
import MainNavbar from "../components/Header/MainNavbar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
