import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import BookForm from "./BookForm";
import { useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";

const EditBook = () => {
  const book = useAppSelector((state) => state.ui.editBook);
  const navigate = useNavigate();
  
  if (book) {
    return (
      <>
        <DialogHeader className="sm:text-center p-4 text-app-primary gap-0">
          <DialogTitle className="font-bold text-2xl mb-2">Edit Book</DialogTitle>
          <DialogDescription>{book.title}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <BookForm onCloseFormModal={() => navigate("/books")} editFormData={book} />
        </div>
      </>
    );
  }
};

export default EditBook;
