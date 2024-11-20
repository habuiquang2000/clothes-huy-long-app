import type { ITouchable } from "./index";
import type { ICategory } from "./category";

export interface IProduct {
  _id?: string;
  nameMaxLength?: number;
  title?: string;
  description?: string;

  price: number;
  quantity: number;
  image?: string;

  category?: ICategory;
}

export interface ProductCardProps extends ITouchable, IProduct {
  cardSize?: "large" | "half" | "medium" | `${number}%`;
}
