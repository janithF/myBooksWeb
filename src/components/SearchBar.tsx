import { useAppDispatch } from "@/app/hooks";
import { uiActions } from "@/features/UI/UISlice";
// import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

interface FormValues {
  searchterm: string;
}

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearchParam = searchParams.get("search") || "";

  const form = useForm<FormValues>({
    defaultValues: {
      searchterm: defaultSearchParam,
    },
  });
  const { register, watch } = form;
  const watchSearchTerm = watch("searchterm");

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    dispatch(uiActions.searchBook(watchSearchTerm));
    if (watchSearchTerm) {
      newParams.set("search", watchSearchTerm);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  }, [watchSearchTerm, dispatch, setSearchParams, searchParams]);

  return (
    <div className="w-full max-w-md font-app-title tracking-wider rounded-full">
      <div className="flex items-center border-0 ">
        <FiSearch className="mr-2 text-xl lg:text-2xl" />
        <input
          id="serchTerm"
          type="text"
          placeholder="Search Book Name"
          {...register("searchterm")}
          className="w-full bg-transparent outline-none text-gray-700 text-lg lg:text-xl  placeholder-gray-400 border-b border-app-secondary py-1"
        />
      </div>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default SearchBar;
