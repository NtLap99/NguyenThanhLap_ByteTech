import { atom } from "recoil";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const productListState = atom<Product[]>({
  key: "productListState",
  default: [],
});
