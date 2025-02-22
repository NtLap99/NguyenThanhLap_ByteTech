// CartModal.tsx
import React from "react";
import { IoMdClose } from "react-icons/io";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Bottom Sheet */}
      <div className="bg-white w-full p-4 rounded-t-2xl shadow-lg relative max-w-md">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          <IoMdClose size={24} />
        </button>
        <h2 className="text-lg font-bold mb-4">Giỏ hàng</h2>
        
        {/* Danh sách sản phẩm */}
        <div className="flex items-center gap-4 border-b pb-2">
          <img src="/sample-product.png" alt="Product" className="w-12 h-12 rounded-lg" />
          <div>
            <p className="text-sm font-semibold">Fjallraven - Backpack</p>
            <p className="text-green-600 font-bold">114.000 Đ x 1</p>
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 font-bold">
          ĐẶT NGAY
        </button>
      </div>
    </div>
  );
};

export default CartModal;
