import React from "react";
import { FaBook } from "react-icons/fa6";
import AuthorsList from "./AuthorsList";

const Sidebar = () => {
  return (
    <div id="myBooks_sidebar" className=" bg-background-dark pb-4 w-64 border border-r-0 rounded-l-2xl border-gray-200 hidden lg:grid lg:grid-rows-[70px_1fr]">
      <h1 className="text-white bg-primary font-title text-3xl uppercase rounded-tl-2xl p-4 font-extrabold flex justify-center items-center">
        <FaBook className="text-secondary mr-2" />
        MYBOOKS
      </h1>
      <AuthorsList />
    </div>
  );
};

export default Sidebar;
