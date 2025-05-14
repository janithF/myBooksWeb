import useBooks from "@/hooks/useBooks";
import { Skeleton } from "./ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MdOutlineClose } from "react-icons/md";
import { uiActions } from "@/features/UI/UISlice";
import { useSearchParams } from "react-router-dom";

const SubHeader = () => {
  const { isLoading, error } = useBooks();
  const { filteredBooksLength: bookListLength, selectedAuthor } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) {
    return (
      <div className="p-2">
        <Skeleton className="h-4 w-[150px] mb-2 bg-gray-300"></Skeleton>
        <Skeleton className="h-4 w-[100px] bg-gray-300"></Skeleton>
      </div>
    );
  }

  const clearAuthor = () => {
    dispatch(uiActions.selectAuthor(null));
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("author");
    setSearchParams(newParams);
  };

  return (
    <>
      {!error && (
        <div className="w-full p-2">
          <div className="text-md flex items-center">
            <h3 className=" mr-4">{selectedAuthor ? <span>Books by <span className="capitalize font-bold">{selectedAuthor}</span></span> : "All Books"}</h3>
            {selectedAuthor && (
              <button className="text-gray-500 cursor-pointer flex justify-center items-center hover:text-gray-700" onClick={clearAuthor}>
                <MdOutlineClose className="text-lg" /> Clear
              </button>
            )}
          </div>

          <span className="text-sm text-gray-400">
            {bookListLength > 0 ? (bookListLength === 1 ? "1 Item" : `${bookListLength} Items`) : "No Items Found"}
          </span>
        </div>
      )}
    </>
  );
};

export default SubHeader;
