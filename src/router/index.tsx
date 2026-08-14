import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProductPage from "../pages/Product/index";
import HomePage from "../pages/Home";
import CatalogPage from "../pages/Catalog";
import AboutPage from "../pages/About";
import DeliveryPage from "../pages/Delivery";
import PaymentPage from "../pages/Payment";
import CartPage from "../pages/Cart";
import ContactsPage from "../pages/Contacts";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import NotFoundPage from "../pages/NotFound";

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
      {
        path: "delivery",
        element: <DeliveryPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
