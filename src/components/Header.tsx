import SearchBar from "./SearchBar";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaList, FaPlus } from "react-icons/fa6";

const Header = () => {
  return (
    <div id="myBooks_header" className="w-full flex items-center justify-between px-4">
      <div className="flex-1">
        <SearchBar />
      </div>
      <div className="flex justify-center items-center">
        <div className="mr-4">
          <button className="p-3 hover:bg-secondary-dark cursor-pointer rounded-md bg-secondary text-primary">
            <BiSolidGridAlt />
          </button>
          <button className="p-3 hover:bg-secondary-dark cursor-pointer rounded-md text-primary">
            <FaList />
          </button>
        </div>
        <button className="flex justify-center items-center py-2 px-4 h-[40px] bg-primary text-white rounded-sm cursor-pointer hover:bg-primary-dark">
          <FaPlus className="mr-2" />
          Add New book
        </button>
      </div>
    </div>
  );
};

export default Header;
