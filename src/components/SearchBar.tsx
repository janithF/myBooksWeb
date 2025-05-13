import { useAppDispatch } from "@/app/hooks";
import { uiActions } from "@/features/UI/UISlice";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

interface FormValues {
  searchterm: string;
}

const SearchBar = () => {
  const form = useForm<FormValues>();
  const { register, control, watch } = form;
  const dispatch = useAppDispatch();
  const watchSearchTerm = watch("searchterm");

  useEffect(() => {
    dispatch(uiActions.searchBook(watchSearchTerm));
  }, [watchSearchTerm, dispatch]);

  return (
    <div className="w-full max-w-md font-app-title text-xl tracking-wider  rounded-full">
      <div className="flex items-center border-0">
        <FiSearch className="mr-2" />
        <input
          id="serchTerm"
          type="text"
          placeholder="Search Book Name"
          {...register("searchterm")}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 border-b border-app-secondary py-1"
        />
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default SearchBar;
