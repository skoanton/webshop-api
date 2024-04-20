import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Itemsprovider from "./providers/Itemsprovider";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import FilterProvider from "./providers/FilterProvider";
import { Filter } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:profileId",
    element: <ProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Itemsprovider>
      <FilterProvider>
        <RouterProvider router={router} />
      </FilterProvider>
    </Itemsprovider>
  </React.StrictMode>
);
