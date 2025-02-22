import React from "react";
import { LuTag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../types/cart";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-3xl shadow-lg p-4 border border-gray-200 overflow-hidden mx-4 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[220px] object-contain rounded-lg"
        />
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
          <LuTag className="mr-1" /> {product.category}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4 bg-green-100 p-3 rounded-xl">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-semibold">Giá Tiền</p>
            <span className="text-green-600 font-bold text-md">
              {product.price.toLocaleString()} Đ
            </span>
          </div>
          <button
            className="!bg-white text-black px-4 py-2 !rounded-3xl font-semibold shadow-md border border-gray-300 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              alert("Thêm vào giỏ hàng!");
            }}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
