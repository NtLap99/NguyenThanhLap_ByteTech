import React from "react";
import ProductList from "../components/product-list";
import Header from "../components/header";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <Header />
      <ProductList />
    </div>
  );
};

export default Home;
