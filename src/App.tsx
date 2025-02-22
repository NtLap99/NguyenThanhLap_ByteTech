import React from "react";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./components/product-detail";
import './index.css'
import Home from "./pages/home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <ProductDetail /> }
]);

const RootApp: React.FC = () => (
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

export default RootApp;
