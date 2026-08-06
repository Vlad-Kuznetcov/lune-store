import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "sonner";

import "./index.css";
import router from "./router";
import { CartProvider } from "./components/context/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />

      <Toaster
        position="bottom-right"
        richColors
        theme="light"
        toastOptions={{
          style: {
            borderRadius: "18px",
            padding: "18px",
            background: "#fff",
            border: "1px solid #e7e5e4",
          },
        }}
      />
    </CartProvider>
  </StrictMode>,
);
