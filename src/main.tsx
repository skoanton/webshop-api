import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Itemsprovider from "./providers/Itemsprovider";
import ItemPage from "./pages/ItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsPage />,
  },
  {
    path: "/products/:profileId",
    element: <ItemPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Itemsprovider>
      <RouterProvider router={router} />
    </Itemsprovider>
  </React.StrictMode>
);
