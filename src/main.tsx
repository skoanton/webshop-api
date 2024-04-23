import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import GlobalProvider from "./contexts/GlobalContext/GlobalProvider";
import CheckoutPage from "./pages/CheckoutPage";
import { Toaster } from "./components/ui/toaster";
import { fetchDataLoader } from "./api/fetchData";
import Root from "./pages/Root";
import { Home } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: fetchDataLoader,
    children: [
      {
        index: true,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
