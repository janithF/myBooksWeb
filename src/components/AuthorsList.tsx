import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { uiActions } from "@/features/UI/UISlice";
import useBooks from "@/hooks/useBooks";
import { FaFeather } from "react-icons/fa6";
import { VscError } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";
import LoadingAuthorsListItem from "./loadingSkeletons/LoadingAuthorsListItem";

const AuthorsList = () => {
  const { data: books, error, isLoading } = useBooks();

  const { selectedAuthor, isSidebarOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const getAuthors = (): string[] => {
    const allAuthors = books?.map((book) => book.author.toLowerCase().trim());
    const authors = [...new Set(allAuthors)];
    return authors;
  };

  const selectAuthor = (author: string) => {
    dispatch(uiActions.selectAuthor(author));
    if (isSidebarOpen) {
      dispatch(uiActions.closeSideBar());
    }
    const newParams = new URLSearchParams(searchParams);
    if (author) {
      newParams.set("author", author);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="p-3 overflow-hidden grid grid-rows-[50px_1fr]">
      <h3 className="w-full ml-2 font-app-title font-bold text-2xl flex items-center text-gray-800">
        <FaFeather className="mr-2" /> Authors
      </h3>
      <div className="overflow-y-auto  text-gray-700">
        {/* Loading */}
        <div className="pt-2">{isLoading && [...Array(5)].map((_, index) => <LoadingAuthorsListItem key={index} />)}</div>

        {/* Error Message */}
        {error && (
          <div className="p-2 flex items-center">
            <VscError className="text-red-400 mr-2" />
            <span className="text-sm">Error Loading Authors List</span>
          </div>
        )}

        {/* Display Authors List */}
        {!isLoading &&
          getAuthors().map((author, index) => (
            <div
              key={index}
              className={`mb-1 p-2 mr-2 cursor-pointer hover:bg-background rounded-md transition duration-50 ease-in-out capitalize ${
                selectedAuthor?.toLowerCase() === author.toLowerCase() ? "bg-app-background" : "bg-transparent"
              }`}
              onClick={() => selectAuthor(author)}
            >
              {author}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorsList;
