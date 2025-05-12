import SearchBar from "./SearchBar";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaList, FaPlus } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uiActions } from "../features/UI/UISlice";
import BookForm from "./BookForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.ui.viewMode);
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    console.log("closeModal");
    setOpen(false);
  };

  return (
    <div id="myBooks_header" className="w-full flex items-center justify-between px-2">
      <div className="flex-1">
        <SearchBar />
      </div>
      <div className="flex justify-center items-center">
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
          onClick={() => setOpen(true)}
        >
          <FaPlus className="mr-2" />
          Add New book
        </button>
        {/* Modal Popup to add a new book */}
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[450px] p-0 bg-app-background gap-0" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader className="sm:text-center p-4 text-app-primary">
              <DialogTitle className="font-bold text-2xl mb-2">Add New Book</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <BookForm onClose={closeModal} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
