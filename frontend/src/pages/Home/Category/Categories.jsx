import React from "react";
import { Link } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import graphIcon from "../../../assets/graph.png";
import codeIcon from "../../../assets/code.png";
import adIcon from "../../../assets/advertisement.png";
import editIcon from "../../../assets/edit.png";
import usersIcon from "../../../assets/users.png";
import moneyBagIcon from "../../../assets/moneyBag.png";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    icon: graphIcon,
    title: "Business Developement",
    positions: 2,
  },

  {
    icon: codeIcon,
    title: "Web Developement",
    positions: 1,
  },

  {
    icon: adIcon,
    title: "Digital Marketing",
    positions: 7,
  },
  {
    icon: editIcon,
    title: "Graphic Designing",
    positions: 6,
  },
  {
    icon: usersIcon,
    title: "Human Resources",
    positions: 6,
  },
  {
    icon: moneyBagIcon,
    title: "Finance Management",
    positions: 3,
  },
];

const Categories = () =>
{
  return (
    <>
      <section className="lg:px-12 px-6 lg:pt-25 pt-10 pb-12.5 bg-[#f5f5f5]">
        <div className="flex justify-between">
          <h2 className="lg:text-[18px] text-[12px] font-medium">
            Search By Category
          </h2>
          <Link className="text-(--primary-color) font-medium text-[11px] lg:text-[15px]">
            All Categories
            <ChevronRightOutlinedIcon sx={ { fontSize: 20 } } />
          </Link>
        </div>

        <div className="grid lg:grid-cols-6 grid-cols-2 mt-7 gap-4 lg:gap-8">
          { categories.map( ( c ) => (
            <CategoryCard category={ c } />
          ) ) }
        </div>
      </section>
    </>
  );
};

export default Categories;
