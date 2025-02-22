import React, { useState } from "react";
import CartIcon from "./cart-icon";
import CartModal from "./cart-modal";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="relative p-4 text-white h-42">
      {/* Lớp nền */}
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

      {/* Nội dung */}
      <div className="relative z-10 mt-12">
        <p className="text-sm text-gray-900">Chào buổi sáng ☀️</p>
        <h2 className="text-xl font-bold text-gray-900">Nguyễn Văn B</h2>
        <div className="absolute top-2 right-4" onClick={() => setIsCartOpen(true)}>
          <CartIcon itemCount={1} />
        </div>
      </div>

      {/* Hiển thị Bottom Sheet */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Header;
