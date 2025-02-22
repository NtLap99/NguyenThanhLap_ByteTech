import { IProduct } from "../types/cart";
import { apiClient } from "./api-client";

const BASE_PATH = "https://fakestoreapi.com/products";

export const getDetailProduct = async (id: string): Promise<IProduct> => {
  return apiClient<IProduct>(`${BASE_PATH}/${id}`);
};

export const getProducts = async (): Promise<IProduct[]> => {
  return apiClient<IProduct[]>(BASE_PATH);
};
