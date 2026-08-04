import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProductPage from "../pages/Product/index";
import HomePage from "../pages/Home";
import CatalogPage from "../pages/Catalog";
import AboutPage from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "catalog/:id",
        element: <ProductPage />,
      },
    ],
  },
]);

export default router;
