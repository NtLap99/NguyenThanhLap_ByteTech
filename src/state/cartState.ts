import { atom, selector } from "recoil";
import { ICartItem, IProduct } from "../types/cart";

export const cartState = atom<ICartItem[]>({
  key: "cartState",
  default: [],
});

export const cartCountState = selector<number>({
  key: "cartCountState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const cartTotalState = selector<number>({
  key: "cartTotalState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
});

export const addToCart = (
  cart: ICartItem[],
  product: IProduct,
  quantity: number = 1
): ICartItem[] => {
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    return cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }
  return [...cart, { product, quantity }];
};

export const updateCartQuantity = (
  cart: ICartItem[],
  productId: number,
  quantity: number
): ICartItem[] => {
  return cart.map((item) =>
    item.product.id === productId
      ? { ...item, quantity: Math.max(1, quantity) }
      : item
  );
};

export const removeFromCart = (cart: ICartItem[], productId: number): ICartItem[] => {
  return cart.filter((item) => item.product.id !== productId);
};
