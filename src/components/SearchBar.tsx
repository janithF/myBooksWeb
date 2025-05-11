import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-md font-app-title text-xl tracking-wider  rounded-full">
      <div className="flex items-center border-0">
        <input
          type="text"
          placeholder="Search Book Name"
          value={searchTerm}
          onChange={handleChange}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 border-b border-app-secondary py-1"
        />
        <button className="bg-app-primary w-[60px] rounded-r-md text-white text-md h-[37px] text-md tracking-normal font-extralight cursor-pointer hover:bg-app-primary-dark flex justify-center items-center">
          <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
