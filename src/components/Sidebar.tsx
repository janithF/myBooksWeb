import AuthorsList from "./AuthorsList";
import AppTitle from "./AppTitle";

const Sidebar = () => {
  return (
    <div
      id="myBooks_sidebar"
      className=" bg-app-background-dark pb-4 w-64 border border-r-0 rounded-l-2xl border-gray-200 hidden lg:grid lg:grid-rows-[70px_1fr]"
    >
      <AppTitle />
      <AuthorsList />
    </div>
  );
};

export default Sidebar;
