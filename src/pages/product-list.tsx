import map from "lodash/map";
import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import Header from "../components/header";
import ProductCard from "../components/product-card";
import WebViewNotice from "../components/web-view-notice";
import { IProduct } from "../types/cart";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {map(products, (product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <WebViewNotice />
    </div>
  );
};

export default ProductList;
