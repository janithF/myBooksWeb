import type { Book } from "../types";

import { uiActions } from "@/features/UI/UISlice";
import { useDeleteBook } from "@/hooks/useDeleteBook";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BookGridCard from "./BookGridCard";
import BookListCard from "./BookListCard";
import AppAlertDialog from "./shared/AppAlertDialog";
import { Dialog, DialogContent } from "./ui/dialog";

interface Props {
  book: Book;
}

const BookListItem = ({ book }: Props) => {
  const [openBookDeleteAlert, setOpenBookDeleteAlert] = useState(false);

  const viewMode = useAppSelector((state) => state.ui.viewMode);
  const dispatch = useAppDispatch();

  const { mutate: deleteBook } = useDeleteBook();

  const location = useLocation();
  const navigate = useNavigate();

  const showEditModal = location.pathname === `/books/edit/${book.id}`;

  // EDIT
  const onEditBook = () => {
    dispatch(uiActions.editBook(book));
    navigate(`/books/edit/${book.id}`);
  };

  // DELETE
  const onDeleteBook = () => {
    setOpenBookDeleteAlert(true);
  };

  const closeOpenedDeleteAlert = () => {
    setOpenBookDeleteAlert(false);
  };

  const executeDelete = () => {
    closeOpenedDeleteAlert();
    deleteBook(book.id);
  };

  // GRID MODE
  return (
    <>
      {viewMode === "grid" ? (
        <BookGridCard book={book} onEdit={onEditBook} onDelete={onDeleteBook} />
      ) : (
        <BookListCard book={book} onEdit={onEditBook} onDelete={onDeleteBook} />
      )}

      {/* Edit Form Modal */}
      <Dialog modal={true} open={showEditModal} onOpenChange={(open) => !open && navigate("/books")}>
        <DialogContent className="w-[450px] p-0 bg-app-background gap-0" onInteractOutside={(e) => e.preventDefault()}>
          <Outlet />
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
        onContinue={executeDelete}
      />
    </>
  );
};

export default BookListItem;
