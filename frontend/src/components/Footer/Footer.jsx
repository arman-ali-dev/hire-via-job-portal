import React from "react";
import { Link } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const Footer = () =>
{
  return (
    <>
      <footer className="bg-(--primary-color) lg:px-16 px-6">
        <div className="top-footer lg:py-10 py-5 flex justify-between items-center border-[rgba(255,255,255,.5)] border-b">
          <Link className="logo font-semibold text-white text-[15px] lg:text-[18px]">
            Hire Via
          </Link>

          <div>
            <Link className="border-white border rounded-full lg:px-8 px-5 font-medium inline-block py-1 lg:py-2 lg:text-[14px] text-[9px] text-white">
              Looking for Job?
            </Link>

            <Link className="bg-white border rounded-full lg:px-8 px-5  font-medium inline-block py-1 lg:py-2 lg:text-[14px] text-[9px] text-(--primary-color) ml-2 lg:ml-4">
              Post a Job
            </Link>
          </div>
        </div>

        <div className="lg:py-18.75 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            <div className="col-span-2 mb-8 lg:mb-0">
              <h2 className="text-white inline-block text-[13px] lg:text-[18px] footerHeading relative">
                Newsletter
              </h2>
              <form className="lg:mt-10 mt-5">
                <div className="relative lg:w-75">
                  <input
                    className="w-full border-b placeholder:text-[12px] lg:placeholder:text-[14px] placeholder:text-white text-[14px] px-6 py-1 text-white"
                    type="text"
                    placeholder="Email Address..."
                  />
                  <EmailOutlinedIcon
                    sx={ {
                      fontSize: { xs: 15, md: 18 },
                      color: "white",
                      position: "absolute",
                      top: { xs: 8, md: 6 },
                      left: { xs: 2, md: 1 },
                    } }
                  />

                  <span className="bg-white lg:h-5.5 lg:w-5.5 h-4.5 w-4.5 flex justify-center items-center rounded-full absolute top-1.5 lg:top-0.5 right-2">
                    <EastOutlinedIcon
                      className="text-(--primary-color)"
                      sx={ { fontSize: { xs: 11, md: 13 } } }
                    />
                  </span>
                </div>
              </form>
            </div>

            <div className="col-span-1">
              <h2 className="text-white inline-block text-[13px] lg:text-[18px] footerHeading relative">
                Services
              </h2>

              <ul className="lg:mt-5 mt-3 lg:space-y-3 space-y-1.5 text-[11px] lg:text-[14px] text-white">
                <li>
                  <Link>Browse Links</Link>
                </li>

                <li>
                  <Link>Companies</Link>
                </li>
                <li>
                  <Link>Candidate Dashboard</Link>
                </li>
                <li>
                  <Link>Pricing Packages</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h2 className="text-white inline-block text-[13px] lg:text-[18px] footerHeading relative">
                Support
              </h2>

              <ul className="lg:mt-5 mt-3 lg:space-y-3 space-y-1.5 text-[11px] lg:text-[14px] text-white">
                <li>
                  <Link>Terms of use</Link>
                </li>

                <li>
                  <Link>Terms of conditions</Link>
                </li>
                <li>
                  <Link>Privacy</Link>
                </li>
                <li>
                  <Link>Cookie policy</Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-1 col-span-2 mt-8 lg:mt-0">
              <h2 className="text-white inline-block text-[13px] lg:text-[18px] footerHeading relative">
                Contact
              </h2>

              <ul className="lg:mt-5 mt-3 lg:space-y-3 space-y-1.5 text-[11px] lg:text-[14px] text-white">
                <li>
                  <p>
                    <FmdGoodOutlinedIcon
                      sx={ {
                        fontSize: 17,
                        color: "white",
                        marginRight: 0.5,
                        verticalAlign: "sub",
                      } }
                    />
                    Caremwell Road New Town London SW7 2RL
                  </p>
                </li>

                <li>
                  <p>
                    <LocalPhoneOutlinedIcon
                      sx={ {
                        fontSize: 17,
                        color: "white",
                        marginRight: 0.5,
                        verticalAlign: "sub",
                      } }
                    />
                    +91 7665407031
                  </p>
                </li>
                <li>
                  <p>
                    <EmailOutlinedIcon
                      sx={ {
                        fontSize: 17,
                        color: "white",
                        marginRight: 0.5,
                        verticalAlign: "sub",
                      } }
                    />
                    arman@gmail.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bottom-footer text-center border-[rgba(255,255,255,.5)] border-t py-3.75 lg:py-7.5">
          <p className="text-white font-normal text-[11px] lg:text-[14px]">
            © 2025 <Link className="underline ">Hire Via</Link> — All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
