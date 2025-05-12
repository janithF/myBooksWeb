import { FaFeather } from "react-icons/fa6";
import useBooks from "@/hooks/useBooks";
import LoadingAuthorsListItem from "./loadingSkeletons/LoadingAuthorsListItem";
import { VscError } from "react-icons/vsc";

const AuthorsList = () => {
  const { data: books, error, isLoading } = useBooks();

  const getAuthors = (): string[] => {
    const allAuthors = books?.map((book) => book.author.toLowerCase().trim());
    const authors = [...new Set(allAuthors)];
    return authors;
  };

  return (
    <div className="p-3 overflow-hidden grid grid-rows-[50px_1fr]">
      <h3 className="w-full ml-2 font-app-title font-bold text-2xl flex items-center text-gray-600">
        <FaFeather className="mr-2" /> Authors
      </h3>
      <div className="overflow-y-auto">
        {/* Loading */}
        <div className="pt-2">{isLoading && [...Array(5)].map((_, index) => <LoadingAuthorsListItem key={index} />)}</div>

        {/* Error Message */}
        {error && <div className="p-2 flex items-center"><VscError className="text-red-400 mr-2" /><span className="text-sm">Error Loading Authors List</span></div>}

        {/* Display Authors List */}
        {!isLoading &&
          getAuthors().map((author, index) => (
            <div key={index} className="mb-1 p-2 mr-2 cursor-pointer hover:bg-background rounded-md transition duration-50 ease-in-out capitalize">
              {author}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorsList;
