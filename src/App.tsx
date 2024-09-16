import NoteProvider from "./context/NoteContext";
import { NotesPage, LoginPage, RegisterPage } from "./pages";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NoteProvider>
      <NotesPage />
    </NoteProvider>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);

const App = () => {
  return (
    <div id="app">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};


export default App;