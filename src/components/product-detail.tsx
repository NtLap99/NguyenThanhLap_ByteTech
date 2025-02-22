import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { addToCart, cartState, updateCartQuantity } from "../state/cartState";
import { IProduct } from "../types/cart";
import CartIcon from "./cart-icon";
import CartModal from "./cart-modal";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { LuTag } from "react-icons/lu";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết sản phẩm:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  const handleBuyNow = () => {
    setIsBuying(true);
    setCart((prevCart) => addToCart(prevCart, product, quantity));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      setCart((prevCart) =>
        updateCartQuantity(prevCart, product.id, newQuantity)
      );
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = Math.max(1, prev - 1);
      setCart((prevCart) =>
        updateCartQuantity(prevCart, product.id, newQuantity)
      );
      return newQuantity;
    });
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <div className="relative bg-white flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className=" h-[480px] w-84"
        />
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
          <LuTag className="mr-1" /> {product.category}
        </span>
      </div>
      <div className="bg-white mx-4 rounded-lg shadow-lg border border-gray-200 relative -mt-8">
        <p className="text-lg font-semibold text-gray-900 line-clamp-2 m-4">
          {product.title}
        </p>
        <div className="flex items-center justify-between mt-2 bg-green-100 h-18 p-4">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-semibold">Giá Tiền</p>
            <span className="text-green-600 font-semibold text-md">
              {product.price.toLocaleString()} Đ
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white w-21 justify-center p-1 rounded-2xl">
            <IoMdStar className="text-yellow-300" size={28} />
            <span className="text-gray-900 font-semibold">
              {product.rating.rate}
            </span>
          </div>
        </div>
        <div className="p-4 rounded-lg m-3 border border-gray-200">
          <h3 className="font-bold text-sm text-gray-900">Mô tả sản phẩm</h3>
          <div
            className={`text-gray-600 text-sm mt-1 ${
              !isExpanded ? "line-clamp-3" : ""
            }`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded ? "unset" : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              ...(isExpanded ? { height: "100px", overflowY: "auto" } : {}), // Conditional styles
            }}
          >
            {product.description}
          </div>
          <div
            className="text-xs font-medium text-green-600 flex items-center justify-center cursor-pointer"
            onClick={handleToggle}
          >
            {isExpanded ? (
              <>
                Rút gọn <MdNavigateBefore size={16} />
              </>
            ) : (
              <>
                Xem thêm <MdNavigateNext size={16} />
              </>
            )}
          </div>
        </div>
      </div>
      {isBuying && (
        <div
          className="fixed bottom-18 right-6"
          onClick={() => setIsCartOpen(true)}
        >
          <CartIcon itemCount={quantity} />
        </div>
      )}
      <div className="bg-white p-4 fixed bottom-0 left-0 w-full h-16 flex items-center justify-center">
        {!isBuying ? (
          <button
            onClick={handleBuyNow}
            className="w-full !bg-green-600 text-white font-semibold"
          >
            MUA NGAY
          </button>
        ) : (
          <div className="flex w-full items-center justify-between">
            <span className="text-green-600 font-bold text-lg">
              {(product.price * quantity).toLocaleString()} Đ
            </span>

            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="rounded-md text-lg border !border-green-600 !bg-white !text-green-600"
              >
                -
              </button>
              <span className="mx-6 text-lg text-gray-900">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="rounded-md text-lg !bg-green-600 !text-green-60"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
      />
    </div>
  );
};

export default ProductDetail;
