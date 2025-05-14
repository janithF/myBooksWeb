import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaList, FaPlus } from "react-icons/fa6";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uiActions } from "../features/UI/UISlice";

import SearchBar from "./SearchBar";

import AppTitle from "./AppTitle";

const Header = () => {
  
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  const location = useLocation();
  const navigate = useNavigate();

  const dialogOpen = location.pathname === "/books/newBook";

  return (
    <div id="myBooks_header" className="w-full grid grid-rows-2 lg:flex lg:items-center lg:justify-between px-2">
      <div className="lg:hidden mb-2">
        <AppTitle />
      </div>
      <div id="myBooks_header-section_a" className="flex items-center mb-4 lg:flex-1 lg:mr-4">
        {/* Searchbar */}
        <div className="flex w-full lg:flex-1 lg:justify-start">
          <SearchBar />
        </div>
      </div>
      {/* Action Buttons */}
      <div id="myBooks_header-section_b" className="flex justify-end items-center">
        <div className="mr-4">
          <button
            className={`p-3 cursor-pointer rounded-md text-app-primary ${viewMode === "grid" && "bg-app-secondary"}`}
            onClick={() => dispatch(uiActions.toggleView("grid"))}
          >
            <BiSolidGridAlt />
          </button>
          <button
            className={`p-3 cursor-pointer rounded-md text-app-primary ${viewMode === "list" && "bg-app-secondary"}`}
            onClick={() => dispatch(uiActions.toggleView("list"))}
          >
            <FaList />
          </button>
        </div>
        <button
          className="flex justify-center items-center px-4 h-[40px] bg-app-primary text-white rounded-sm cursor-pointer hover:bg-primary-dark"
          onClick={() => navigate("/books/newBook")}
        >
          <FaPlus className="mr-2" />
          Add New book
        </button>
        {/* Modal Popup to add a new book */}
        <Dialog modal={true} open={dialogOpen} onOpenChange={(open) => !open && navigate("/books")}>
          <DialogContent className="w-[450px] p-0 bg-app-background gap-0" onInteractOutside={(e) => e.preventDefault()}>
            <Outlet />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
