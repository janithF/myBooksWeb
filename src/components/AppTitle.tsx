import { FaBook } from "react-icons/fa6";
import { RiMenuLine } from "react-icons/ri";
import AuthorsList from "./AuthorsList";
import AppSideBar from "./shared/AppSideBar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { uiActions } from "@/features/UI/UISlice";

const AppTitle = () => {
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    dispatch(uiActions.closeSideBar());
  };

  const openSidebar = () => {
    dispatch(uiActions.openSidebar());
  };

  return (
    <div className="flex items-center w-full text-white bg-app-primary p-4 lg:rounded-tl-2xl">
      <div>
        {/* Sidebar */}
        <div className="lg:hidden cursor-pointer mr-4" onClick={openSidebar}>
            <RiMenuLine className="text-2xl" />
        </div>
        <AppSideBar isOpen={isSidebarOpen} onClose={closeSidebar} width="w-80">
            <AuthorsList />
        </AppSideBar>
      </div>
      <h1 className="font-app-title text-3xl uppercase rounded-tl-2xlfont-extrabold flex items-center justify-center flex-1">
        <FaBook className="text-secondary mr-2" />
        MYBOOKS
      </h1>
    </div>
  );
};

export default AppTitle;
