import { useAppDispatch, useAppSelector } from "../app/hooks";
import BookListItem from "./BookListItem";
import useBooks from "@/hooks/useBooks";
import LoadingBookListItem from "./loadingSkeletons/LoadingBookListItem";
import { BiError } from "react-icons/bi";
import { MdSearchOff } from "react-icons/md";
import { useEffect, useMemo } from "react";
import { uiActions } from "@/features/UI/UISlice";

const BookList = () => {
  const viewMode = useAppSelector((state) => state.ui.viewMode);
  const bookSearchTerm = useAppSelector((state) => state.ui.searchTerm);
  const dispatch = useAppDispatch();

  const { data: books = [], error, isLoading } = useBooks();

  const fiteredBooks = useMemo(() => {
    return books.filter((book) => book.title.toLowerCase().includes(bookSearchTerm?.toLowerCase()));
  }, [bookSearchTerm, books]);

  useEffect(() => {
    dispatch(uiActions.booksFiltered(fiteredBooks.length));
  }, [fiteredBooks.length, dispatch]);

  if (isLoading)
    return (
      <div className={`${viewMode === "grid" && "grid grid-cols-[repeat(auto-fit,_minmax(15rem,_280px))] gap-4"} p-2`}>
        {[...Array(10)].map((_, index) => (
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
      {!(fiteredBooks.length > 0) && (
        <div className="w-full h-full flex justify-center items-center text-[20rem] text-gray-300">
          <MdSearchOff />
        </div>
      )}
      <div className={`${viewMode === "grid" && "grid grid-cols-[repeat(auto-fit,_minmax(15rem,_280px))] gap-4"}`}>
        {fiteredBooks.length > 0 && fiteredBooks?.map((book) => <BookListItem key={book.id} book={book} />)}
      </div>
    </div>
  );
};

export default BookList;
