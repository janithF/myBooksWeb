import { Toaster } from "sonner";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div id="myBooks" className="px-5 py-2 flex h-screen overflow-hidden ">
      <Sidebar />
      <MainContent />
      <Toaster position="top-right" expand={true} richColors />
    </div>
  );
}

export default App;
