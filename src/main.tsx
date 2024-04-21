import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Itemsprovider from "./providers/Itemsprovider";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import FilterProvider from "./providers/FilterProvider";
import { Filter } from "lucide-react";
import GlobalProvider from "./providers/GlobalProvider";
import CheckoutPage from "./pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:profileId",
    element: <ProductPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
