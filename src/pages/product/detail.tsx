import { find } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { LuTag } from "react-icons/lu";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getDetailProduct } from "../../api";
import CartIcon from "../../components/cart/cart-icon";
import CartModal from "../../components/cart/cart-modal";
import WebViewNotice from "../../components/common/web-view-notice";
import {
  addToCart,
  cartCountState,
  cartState,
  cartTotalState,
  updateCartQuantity,
} from "../../state/cate/cart-state";
import { IProduct } from "../../types/cart";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>();
  const [isBuying, setIsBuying] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const cartTotal = useRecoilValue(cartTotalState);
  const cartCount = useRecoilValue(cartCountState);

  const foundItem = useMemo(
    () => find(cart, (item) => item.product.id === Number(id)),
    [cart, id]
  );

  useEffect(() => {
    if (foundItem) setQuantity(foundItem.quantity);
    else {
      setIsBuying(false);
      setQuantity(1);
    }
  }, [foundItem]);

  useEffect(() => {
    if (!id) return;
    getDetailProduct(id)
      .then(setProduct)
      .catch((error) => console.error("Lỗi khi lấy chi tiết sản phẩm:", error));
  }, [id]);

  if (!product) return <div>Đang tải...</div>;

  const handleBuyNow = () => {
    setIsBuying(true);
    setCart(addToCart(cart, product, quantity));
  };

  const changeQuantity = (amount: number) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
    setCart(updateCartQuantity(cart, product.id, newQuantity));
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-18">
      <div className="relative bg-white flex justify-center lg:hidden">
        <img src={product.image} alt={product.title} className="h-96 w-84" />
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
          <LuTag className="mr-1" /> {product.category}
        </span>
      </div>
      <div className="bg-white mx-4 rounded-lg shadow-lg border border-gray-200 relative -mt-8 lg:hidden">
        <p className="text-lg font-semibold text-gray-900 line-clamp-2 m-4">
          {product.title}
        </p>
        <div className="flex items-center justify-between bg-green-100 h-18 p-4">
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
          <p
            className={`text-gray-600 text-sm mt-1 ${
              !isExpanded && "line-clamp-3"
            }`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded ? "unset" : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
          <div
            className="text-xs font-medium text-green-600 flex items-center justify-center cursor-pointer mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
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
          className="fixed bottom-18 right-4 hover:scale-105 active:scale-95 cursor-pointer  px-4 lg:hidden"
          onClick={() => setIsCartOpen(true)}
        >
          <CartIcon itemCount={cartCount} />
        </div>
      )}

      <div className="bg-white p-4 fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-16 flex items-center justify-center shadow-md lg:hidden">
        <div className="w-full flex justify-center">
          {!isBuying ? (
            <button
              onClick={handleBuyNow}
              className="w-full !bg-green-600 text-white font-semibold py-3 rounded-md text-center"
            >
              MUA NGAY
            </button>
          ) : (
            <div className="flex w-full items-center justify-between px-4">
              <span className="text-green-600 font-bold text-lg">
                {cartTotal.toLocaleString()} Đ
              </span>

              <div className="flex items-center">
                <button
                  onClick={() => changeQuantity(-1)}
                  className="rounded-md text-lg border !border-green-600 !bg-white text-green-600 px-3 py-1 active:bg-green-600 !focus:outline-none"
                >
                  -
                </button>
                <span className="mx-6 text-lg text-gray-900">{quantity}</span>
                <button
                  onClick={() => changeQuantity(1)}
                  className="rounded-md text-lg !bg-green-600 text-white px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
      />
      <WebViewNotice />
    </div>
  );
};

export default ProductDetail;
