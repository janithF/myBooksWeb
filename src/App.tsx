import BookList from "./components/BookList";

function App() {
  return (
    <div id="myBooks" className="px-5 py-2 flex h-screen overflow-hidden">
      <div id="myBooks_sidebar" className=" bg-whte p-4 w-64 border border-r-0 rounded-l-2xl border-gray-200 hidden lg:block">
        <h1 className="text-primary font-title text-4xl font-extrabold">MyBooks</h1>
      </div>
      <div id="myBooks_mainContent" className="h-full bg-background flex-1 p-4 overflow-y-scroll">
        <BookList />
      </div>
    </div>
  );
}

export default App;
