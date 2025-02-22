import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productListState } from "../state/productState";
import axios from "axios";
import _ from "lodash";
import ProductCard from "./product-card";

const ProductList: React.FC = () => {
  const [products, setProducts] = useRecoilState(productListState);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, [setProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {_.map(products, (product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
