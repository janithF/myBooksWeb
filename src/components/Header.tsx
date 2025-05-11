import SearchBar from "./SearchBar";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaList, FaPlus } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uiActions } from "../features/UI/UISlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(state=>state.ui.viewMode);

  return (
    <div id="myBooks_header" className="w-full flex items-center justify-between px-4">
      <div className="flex-1">
        <SearchBar />
      </div>
      <div className="flex justify-center items-center">
        <div className="mr-4">
          <button
            className={`p-3 hover:bg-secondary-dark cursor-pointer rounded-md text-primary ${viewMode === "grid" && 'bg-secondary'}`}
            onClick={() => dispatch(uiActions.toggleView("grid"))}
          >
            <BiSolidGridAlt />
          </button>
          <button
            className={`p-3 hover:bg-secondary-dark cursor-pointer rounded-md text-primary ${viewMode === 'list' && 'bg-secondary'}`}
            onClick={() => dispatch(uiActions.toggleView("list"))}
          >
            <FaList />
          </button>
        </div>
        <button className="flex justify-center items-center px-4 h-[40px] bg-primary text-white rounded-sm cursor-pointer hover:bg-primary-dark">
          <FaPlus className="mr-2" />
          Add New book
        </button>
      </div>
    </div>
  );
};

export default Header;
