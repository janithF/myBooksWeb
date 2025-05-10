import SearchBar from "./SearchBar";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaList, FaPlus } from "react-icons/fa6";
import BookList from "./BookList";

const MainContent = () => {
  return (
    <div id="myBooks_mainContent" className="h-full flex-1 p-4 overflow-hidden bg-background rounded-r-2xl">
      <div className="w-full h-[5%] flex items-center justify-between mb-5">
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
      <div className="h-[94%] overflow-y-auto">
        <BookList />
      </div>
    </div>
  );
};

export default MainContent;
