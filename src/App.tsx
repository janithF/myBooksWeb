import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div id="myBooks" className="px-5 py-2 flex h-screen overflow-hidden ">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
