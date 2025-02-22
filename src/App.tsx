import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import './index.css';
import ProductDetail from "./pages/product-detail";
import ProductList from "./pages/product-list";

const router = createBrowserRouter([
  { path: "/", element: <ProductList /> },
  { path: "/product/:id", element: <ProductDetail /> }
]);

const RootApp: React.FC = () => (
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

export default RootApp;
