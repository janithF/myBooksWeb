import type { Book } from "../types";
import { FaStar } from "react-icons/fa";

interface Props {
  book: Book;
}

const BookListItem = ({ book }: Props) => {
  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden w-[280px] group">
      <img src={book.img} alt={book.title} className="h-60 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 font-title m-0">{book.title}</h2>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Hover Action Buttons */}
      <div className="absolute top-0 w-full p-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 bg-[#22202985] transition-opacity">
        <button className="bg-blue-500 text-white px-2 py-3 text-xs w-[60px] rounded hover:bg-blue-600 cursor-pointer">Edit</button>
        <button className="bg-red-500 text-white px-2 py-3 text-xs w-[60px] rounded hover:bg-red-600 cursor-pointer">Delete</button>
      </div>
    </div>
  );
};

export default BookListItem;
