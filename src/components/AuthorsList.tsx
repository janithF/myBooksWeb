import { FaFeather } from "react-icons/fa6";
import { books } from "../data";

const AuthorsList = () => {
  const getAuthors = (): string[] => {
    const allAuthors: string[] = books.map((book) => book.author.toLowerCase().trim());
    const authors = [...new Set(allAuthors)];
    return authors;
  };

  return (
    <div className="p-3 overflow-hidden grid grid-rows-[50px_1fr] gap-4">
      <h3 className="w-full ml-2 font-title font-bold text-2xl flex items-center text-gray-600">
        <FaFeather className="mr-2" /> Authors
      </h3>
      <div className="overflow-y-auto">
        {getAuthors().map((author, index) => (
          <div key={index} className="mb-1 font-body p-2 mr-2 cursor-pointer hover:bg-background rounded-md transition duration-50 ease-in-out capitalize">{author}</div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsList;
