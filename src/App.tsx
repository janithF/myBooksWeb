import "./App.css";

function App() {
  return (
    <div id="myBooks" className="px-5 md:px-10 lg:px-20 py-2 flex h-screen">
      <div id="myBooks_sidebar" className="h-full bg-whte p-4 w-64 border border-r-0 rounded-l-2xl border-gray-200 hidden md:block">
        <h1 className="text-primary font-title text-4xl font-extrabold">MyBooks</h1>
      </div>
      <div id="myBooks_mainContent" className="h-full bg-background flex-1 p-4">
        <p className="text-accent">Hello All</p>
      </div>
    </div>
  );
}

export default App;
