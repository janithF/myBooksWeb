import { useAppSelector } from "../app/hooks";
import BookListItem from "./BookListItem";
import useBooks from "@/hooks/useBooks";
import LoadingBookListItem from "./loadingSkeletons/LoadingBookListItem";
import { BiError } from "react-icons/bi";

const BookList = () => {
  const viewMode = useAppSelector((state) => state.ui.viewMode);

  const { data: books, error, isLoading } = useBooks();

  if (isLoading)
    return (
      <div className={`${viewMode === "grid" && "grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-4"} p-2`}>
        {[...Array(5)].map((_, index) => (
          <LoadingBookListItem viewMode={viewMode} key={index} />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-2 bg flex justify-center items-center flex-col">
        <BiError className=" text-gray-300 text-[250px]" />
        <h3 className="text-gray-400 text-[20px]">Failed to Load Books</h3>
        <span className="text-red-400 text-[20px]">{error.message}</span>
      </div>
    );

  return (
    <div id="myBooks_booklist" className="p-2 overflow-y-auto">
      <div className={`${viewMode === "grid" && "grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-4"}`}>
        {books?.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
