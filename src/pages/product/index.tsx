import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../api";
import WebViewNotice from "../../components/common/web-view-notice";
import Header from "../../components/header/header";
import ProductCard from "../../components/product/product-card";
import { IProduct } from "../../types/cart";

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
      <div className="grid grid-cols-1 gap-6 lg:hidden -mt-2">
        {map(products, (product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <WebViewNotice />
    </div>
  );
};

export default ProductList;
