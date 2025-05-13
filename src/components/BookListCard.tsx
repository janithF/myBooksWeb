import type { Book } from "@/types";
import { FaStar } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

interface Props {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

const BookListCard = ({ book, onEdit, onDelete }: Props) => {
  return (
    <div className="relative bg-white shadow-md rounded-md overflow-hidden mb-2 flex max-w-[800px] group">
      <img src={book.image} alt={book.title} className="h-24 w-24 mr-4" />
      <div className="p-2 space-y-2">
        <h2 className="text-xl font-light text-gray-800 line-clamp-2 m-0">{book.title}</h2>
        <p className="text-sm text-gray-500">
          by <span className="capitalize">{book.author}</span>
        </p>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Hover Action Buttons */}
      <div className="absolute right-0 w-30 h-full flex opacity-0 group-hover:opacity-100 bg-[#22202985] transition-opacity">
        <div
          className="flex justify-center items-center w-1/2 text-white font-bold text-xl px-2 py-4 hover:bg-[#3c9d9b91]  cursor-pointer"
          onClick={onEdit}
        >
          <FaPencil />
        </div>
        <div
          className="flex justify-center items-center w-1/2 font-bold text-xl  text-white px-2 py-3 hover:bg-[#ff000077] rounded cursor-pointer"
          onClick={onDelete}
        >
          <FaTrash />
        </div>
      </div>
    </div>
  );
};

export default BookListCard;
