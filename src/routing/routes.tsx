import App from "@/App";
import AddNewBook from "@/components/AddNewBook";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/books" replace /> },
  { path: "/books", element: <App />, children: [{ path: "newBook", element: <AddNewBook /> }] },
]);

export default router;
