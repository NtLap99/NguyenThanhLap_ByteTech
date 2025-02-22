import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <div className="text-center p-5">Đang tải...</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-gray-700 mt-3">{product.description}</p>
      <p className="text-green-600 font-bold text-xl mt-4">{product.price.toLocaleString()} Đ</p>
      <button className="mt-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductDetail;
