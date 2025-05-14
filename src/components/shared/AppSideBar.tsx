import { X } from "lucide-react";
import type { ReactNode } from "react";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  className?: string;
}

const AppSideBar = ({ isOpen, onClose, children, width = "w-64" }: Props) => {
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 ${isOpen ? "block" : "hidden"}`} onClick={onClose} />

      <div
        className={`fixed top-0 left-0 h-full ${width} bg-app-background-dark dark:bg-gray-800 shadow-lg 
          transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 
            dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
        >
          <X size={20} />
        </button>
        <div className="-mt-3 p-2 h-full overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default AppSideBar;
