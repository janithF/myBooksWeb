import { useAppSelector } from "../app/hooks";
import { books } from "../data";
import BookListItem from "./BookListItem";

const BookList = () => {
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  return (
    <div id="myBooks_booklist" className="p-4 overflow-y-auto">
      <div className="mb-3 w-full">
        <h3 className="font-body text-md">All Books</h3>
        <span className="text-sm text-gray-400">Showing {books.length} Items</span>
      </div>
      <div className={`${viewMode === "grid" && "grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-4"}`}>
        {books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
