import { useAppSelector } from "../app/hooks";
import { books } from "../data";
import BookListItem from "./BookListItem";

const BookList = () => {
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  return (
    <div id="myBooks_booklist" className="p-2 overflow-y-auto">
      <div className={`${viewMode === "grid" && "grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-4"}`}>
        {books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
