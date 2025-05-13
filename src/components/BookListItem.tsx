import type { Book } from "../types";
import { FaStar } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { useAppSelector } from "../app/hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import BookForm from "./BookForm";
import { useState } from "react";

interface Props {
  book: Book;
}

const BookListItem = ({ book }: Props) => {
  const [open, setOpen] = useState(false);
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  const onEditBook = () => {
    console.log("Edit book", book);
    setOpen(true)
  };

  const onDeleteBook = () => {
    console.log("Delete book", book);
  };

  // LIST MODE
  if (viewMode === "list") {
    return (
      <div className="relative bg-white shadow-md rounded-md overflow-hidden mb-2 flex max-w-[800px] group">
        <img src={book.image} alt={book.title} className="h-24 w-24 mr-4" />
        <div className="p-2 space-y-2">
          <h2 className="text-xl font-light text-gray-800 line-clamp-2 m-0">{book.title}</h2>
          <p className="text-sm text-gray-500">
            by <span className="capitalize">{book.author.toLowerCase()}</span>
          </p>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Hover Action Buttons */}
        <div className="absolute right-0 w-30 h-full flex opacity-0 group-hover:opacity-100 bg-[#22202985] transition-opacity">
          <div
            className="flex justify-center items-center w-1/2 text-white font-bold text-xl px-2 py-4 hover:bg-[#3c9d9b91]  cursor-pointer"
            onClick={onEditBook}
          >
            <FaPencil />
          </div>
          <div
            className="flex justify-center items-center w-1/2 font-bold text-xl  text-white px-2 py-3 hover:bg-[#ff000077] rounded cursor-pointer"
            onClick={onDeleteBook}
          >
            <FaTrash />
          </div>
        </div>
      </div>
    );
  }

  // GRID MODE
  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden group">
      <img src={book.image} alt={book.title} className="h-60 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-light text-gray-800 line-clamp-2 m-0">{book.title}</h2>
        <p className="text-sm text-gray-500">
          by <span className="capitalize">{book.author.toLowerCase()}</span>
        </p>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Hover Action Buttons */}
      <div className="absolute top-0 w-full flex justify-center opacity-0 group-hover:opacity-100 bg-[#22202985] transition-opacity">
        <div
          className="flex justify-center items-center h-15 w-1/2 text-white font-bold text-xl px-2 py-4 hover:bg-[#3c9d9b91]  cursor-pointer"
          onClick={onEditBook}
        >
          <FaPencil />
        </div>
        <div
          className="flex justify-center items-center h-15 w-1/2 font-bold text-xl  text-white px-2 py-3 hover:bg-[#ff000077] rounded cursor-pointer"
          onClick={onDeleteBook}
        >
          <FaTrash />
        </div>
      </div>

      {/* Edit Form Modal */}
      <Dialog modal={true} open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[450px] p-0 bg-app-background gap-0" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader className="sm:text-center p-4 text-app-primary gap-0">
              <DialogTitle className="font-bold text-2xl mb-2">Edit Book</DialogTitle>
              <DialogDescription>{book.title}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <BookForm onCloseFormModal={()=>setOpen(false)} editFormData={book}/>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default BookListItem;
