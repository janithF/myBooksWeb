import type { Book } from "../types";
import { FaStar } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

interface Props {
  book: Book;
}

const BookListItem = ({ book }: Props) => {
  return (
    <div className="relative bg-white shadow-md rounded-xl overflow-hidden group">
      <img src={book.img} alt={book.title} className="h-60 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-light text-gray-800 line-clamp-2 font-body m-0">{book.title}</h2>
        <p className="text-sm text-gray-500">by <span className="capitalize">{book.author.toLowerCase()}</span></p>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Hover Action Buttons */}
      <div className="absolute top-0 w-full flex justify-center opacity-0 group-hover:opacity-100 bg-[#22202985] transition-opacity">
        <div className="flex justify-center items-center h-15 w-1/2 text-white font-bold text-xl px-2 py-4 hover:bg-[#3c9d9b91]  cursor-pointer"> <FaPencil/> </div>
        <div className="flex justify-center items-center h-15 w-1/2 font-bold text-xl  text-white px-2 py-3 hover:bg-[#ff000077] rounded cursor-pointer"> <FaTrash /> </div>
      </div>
    </div>
  );
};

export default BookListItem;
