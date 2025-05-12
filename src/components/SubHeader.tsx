import React from "react";
import { books } from "../data";

const SubHeader = () => {
  return (
    <div className="w-full p-2">
      <h3 className="text-md">All Books</h3>
      <span className="text-sm text-gray-400">Showing {books.length} Items</span>
    </div>
  );
};

export default SubHeader;
