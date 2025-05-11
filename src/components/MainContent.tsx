import BookList from "./BookList";
import Header from "./Header";

const MainContent = () => {
  return (
    <div id="myBooks_mainContent" className="h-full flex-1 p-4 overflow-hidden bg-app-background rounded-r-2xl grid grid-rows-[50px_1fr] gap-2">
      <Header />
      <BookList />
    </div>
  );
};

export default MainContent;
