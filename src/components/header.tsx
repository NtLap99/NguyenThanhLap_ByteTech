import React, { useState } from "react";
import CartIcon from "./cart-icon";
import CartModal from "./cart-modal";
import { useRecoilState } from "recoil";
import { cartState } from "../state/cartState";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart] = useRecoilState(cartState);
  return (
    <div className="relative p-4 text-white h-42">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/Cover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      ></div>
      <div className="relative z-10 mt-12">
        <p className="text-sm text-gray-900 font-semibold">Chào buổi sáng ☀️</p>
        <h2 className="text-2xl font-bold text-gray-900 font-semibold">Nguyễn Văn B</h2>
        <div className="absolute top-2 right-4" onClick={() => setIsCartOpen(true)}>
          <CartIcon itemCount={cart.length} />
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart}/>
    </div>
  );
};

export default Header;
