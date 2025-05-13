import type { Book } from "../types";

import { useAppSelector } from "../app/hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import BookForm from "./BookForm";
import { useState } from "react";
import AppAlertDialog from "./shared/AppAlertDialog";
import BookGridCard from "./BookGridCard";
import BookListCard from "./BookListCard";

interface Props {
  book: Book;
}

const BookListItem = ({ book }: Props) => {
  const [openBookFormModal, setOpenBookFormModal] = useState(false);
  const [openBookDeleteAlert, setOpenBookDeleteAlert] = useState(false);
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  // EDIT
  const onEditBook = () => {
    setOpenBookFormModal(true);
  };

  // DELETE
  const onDeleteBook = () => {
    setOpenBookDeleteAlert(true);
  };

  const closeOpenedDeleteAlert = () => {
    setOpenBookDeleteAlert(false);
  };

  const deleteBook = () => {
    console.log("Delete book", book);
  };

  // GRID MODE
  return (
    <>
      {viewMode === 'grid' ? <BookGridCard book={book} onEdit={onEditBook} onDelete={onDeleteBook} /> : <BookListCard book={book} onEdit={onEditBook} onDelete={onDeleteBook} />}
      
      {/* Edit Form Modal */}
      <Dialog modal={true} open={openBookFormModal} onOpenChange={setOpenBookFormModal}>
        <DialogContent className="w-[450px] p-0 bg-app-background gap-0" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader className="sm:text-center p-4 text-app-primary gap-0">
            <DialogTitle className="font-bold text-2xl mb-2">Edit Book</DialogTitle>
            <DialogDescription>{book.title}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <BookForm onCloseFormModal={() => setOpenBookFormModal(false)} editFormData={book} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AppAlertDialog
        title="Delete Book"
        message="Are you sure you want to delete this book"
        cancelText="No"
        continueText="Yes, Delete"
        open={openBookDeleteAlert}
        onCancel={closeOpenedDeleteAlert}
        onContinue={deleteBook}
      />
    </>  
  );
};

export default BookListItem;
