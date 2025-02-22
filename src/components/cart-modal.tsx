import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ICartItem } from "../types/cart";
import { useRecoilState } from "recoil";
import { cartState } from "../state/cartState";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ICartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items }) => {
  const [, setCart] = useRecoilState(cartState);
  const handleRemoveItem = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white w-full pb-4 pt-2 px-4 rounded-t-2xl shadow-lg relative max-w-md">
        <div
          className="absolute text-gray-600 left-48 w-16 !h-2 bg-gray-200 rounded-xl"
          onClick={onClose}
        />
        <h2 className="text-lg font-semibold mb-2 text-gray-900 mt-4">
          Giỏ hàng
        </h2>
        <div className="max-h-60 overflow-y-auto">
          {items.length > 0 ? (
            items.map((item: ICartItem) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-4 border-b pb-2 mb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image || "/sample-product.png"}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {item.product.title}
                    </p>
                    <div className="flex items-center gap-x-1">
                      <p className="text-green-600 font-bold">
                        {item.product.price.toLocaleString()} Đ
                      </p>
                      <span className="text-sm text-gray-900">
                        x {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="text-gray-500 hover:text-red-500 !bg-white"
                >
                  <RiDeleteBin5Line size={16} className="text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Giỏ hàng trống</p>
          )}
        </div>
        {items.length > 0 && (
          <button className="w-full !bg-green-600 text-white py-2 rounded-lg mt-4 font-bold">
            ĐẶT NGAY
          </button>
        )}
      </div>
    </div>
  );
};

export default CartModal;
