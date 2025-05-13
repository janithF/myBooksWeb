import useBooks from "@/hooks/useBooks";
import { Skeleton } from "./ui/skeleton";
import { useAppSelector } from "@/app/hooks";

const SubHeader = () => {
  const { isLoading, error } = useBooks();
  const bookListLength = useAppSelector((state) => state.ui.filteredBooksLength);

  if (isLoading) {
    return (
      <div className="p-2">
        <Skeleton className="h-4 w-[150px] mb-2 bg-gray-300"></Skeleton>
        <Skeleton className="h-4 w-[100px] bg-gray-300"></Skeleton>
      </div>
    );
  }

  return (
    <>
      {!error && (
        <div className="w-full p-2">
          <h3 className="text-md">All Books</h3>
          <span className="text-sm text-gray-400">
            {bookListLength > 0 ? (bookListLength === 1 ? "1 Item" : `${bookListLength} Items`) : "No Items Found"}
          </span>
        </div>
      )}
    </>
  );
};

export default SubHeader;
