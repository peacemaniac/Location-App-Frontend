import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CreatePage from "./pages/create/CreatePage";
import LocationPage from "./pages/location/LocationPage";
import SearchPage from "./pages/search/SearchPage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/locations/:locationId",
        element: <LocationPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

function LayoutWrapper() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
