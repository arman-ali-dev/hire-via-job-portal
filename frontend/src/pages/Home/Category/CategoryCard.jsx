import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ( { category } ) =>
{
  return (
    <Link
      className="col-span-1 rounded-[22px] text-center p-3 lg:p-5"
      style={ { background: "rgba(132, 220, 255, .3)" } }
    >
      <div className="bg-white mx-auto flex justify-center items-center h-17.5 w-17.5 shadow-lg rounded-xl">
        <img className="lg:w-10 w-6.25" src={ category.icon } alt="" />
      </div>

      <div className="mt-2">
        <h2 className="w-[80%] mx-auto font-medium text-center lg:text-[16px] text-[14px]">
          { category.title }
        </h2>
        <p className="lg:text-[14px] text-[12px] text-[#7A7979] mt-8 mb-0">
          { category.positions } Open Positions
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
