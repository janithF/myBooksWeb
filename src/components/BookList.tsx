import { uiActions } from "@/features/UI/UISlice";
import useBooks from "@/hooks/useBooks";
import { useEffect, useMemo } from "react";
import { BiError } from "react-icons/bi";
import { MdSearchOff } from "react-icons/md";
import { matchPath, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BookListItem from "./BookListItem";
import LoadingBookListItem from "./loadingSkeletons/LoadingBookListItem";

const BookList = () => {
  const viewMode = useAppSelector((state) => state.ui.viewMode);
  const { searchTerm: bookSearchTerm, selectedAuthor } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const { data: books = [], error, isLoading } = useBooks();

  const location = useLocation();
  const matchEditPath = matchPath("books/edit/:id", location.pathname);

  const fiteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesTitle = bookSearchTerm ? book.title.toLowerCase().includes(bookSearchTerm?.toLowerCase()) : true;
      const matchesAuthor = selectedAuthor ? book.author.toLowerCase().includes(selectedAuthor?.toLowerCase()) : true;

      return matchesTitle && matchesAuthor;
    });
  }, [bookSearchTerm, books, selectedAuthor]);

  useEffect(() => {
    dispatch(uiActions.booksFiltered(fiteredBooks.length));
    if (matchEditPath) {
      const id = matchEditPath?.params.id;
      const editItem = books.find((book) => book.id === id);
      if (editItem) {
        dispatch(uiActions.editBook(editItem));
      }
    }
  }, [fiteredBooks.length, dispatch, matchEditPath, books]);

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
