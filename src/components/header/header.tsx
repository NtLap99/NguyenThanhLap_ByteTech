import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartCountState, cartState } from "../../state/cate/cart-state";
import CartIcon from "../cart/cart-icon";
import CartModal from "../cart/cart-modal";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart] = useRecoilState(cartState);
  const cartCount = useRecoilValue(cartCountState);
  return (
    <div className="relative p-4 text-white h-50 lg:hidden w-screen">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0.95) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0.95) 95%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      <div className="relative z-10 mt-16">
        <p className="text-sm text-gray-900 font-semibold">Chào buổi sáng ☀️</p>
        <h2 className="text-2xl font-bold text-gray-900 font-semibold">
          Nguyễn Văn B
        </h2>
        <div
          className="absolute top-2 right-4 hover:scale-105 active:scale-95 cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        >
          <CartIcon itemCount={cartCount} />
        </div>
      </div>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
      />
    </div>
  );
};

export default Header;
