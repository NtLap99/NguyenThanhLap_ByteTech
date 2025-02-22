export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: IRating;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
