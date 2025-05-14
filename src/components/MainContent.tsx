import BookList from "./BookList";
import Header from "./Header";
import SubHeader from "./SubHeader";

const MainContent = () => {
  return (
    <div
      id="myBooks_mainContent"
      className="h-full flex-1 p-4 overflow-hidden bg-app-background rounded-l-2xl rounded-r-2xl lg:rounded-r-2xl lg:rounded-none grid grid-rows-[auto_auto_1fr] gap-2"
    >
      <Header />
      <SubHeader />
      <BookList />
    </div>
  );
};

export default MainContent;
