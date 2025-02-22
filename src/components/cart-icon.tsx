import React from "react";
import { CiShoppingCart } from "react-icons/ci";

interface CartIconProps {
  itemCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="bg-green-600 p-2 rounded-full shadow-md">
        <CiShoppingCart className="text-white w-5 h-5" />
      </div>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
