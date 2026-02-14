import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import "./index.css";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  cartId: string; // ID único para o front-end
}

const Layout = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const newItem = {
      ...product,
      cartId: crypto.randomUUID() // Gera um ID único: "36b8f84d-..."
    };
    setCart((prevCart) => [...prevCart, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <Outlet context={{ cart, addToCart, removeFromCart, clearCart }} />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error("Error: 'root' element didn't found in HTML.");
}