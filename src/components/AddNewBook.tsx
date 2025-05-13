import { DialogHeader, DialogTitle } from "./ui/dialog";
import BookForm from "./BookForm";
import { useNavigate } from "react-router-dom";

const AddNewBook = () => {
  const navigate = useNavigate();

  return (
    <>
      <DialogHeader className="sm:text-center p-4 text-app-primary">
        <DialogTitle className="font-bold text-2xl mb-2">Add New Book</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <BookForm onCloseFormModal={() => navigate("/books")} />
      </div>
    </>
  );
};

export default AddNewBook;
