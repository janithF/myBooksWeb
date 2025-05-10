import { books } from "../data";
import BookListItem from "./BookListItem";

const BookList = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 sm:p-6 justify-center">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
