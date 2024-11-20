import type { ITouchable } from "./index";

import type { IUser } from "./auth";
import type { IProduct } from "./product";
import type { ICart } from "./cart";

export interface IOrderItem extends IProduct {
  productId?: string;
  categoryId?: string;
}

export interface IOrder {
  orderId?: string;
  user?: IUser | string;
  status?: "pending" | "shipped" | "delivered";
  createdAt?: Date;
  items?: IOrderItem[] | ICart[];

  amount?: number;
  discount?: number;
  shippingAddress?: string;

  country?: string;
  city?: string;
  payment_type?: "cod" | "online";
  shippedOn?: string;
  deliveredOn?: string;
}

export interface IOrderListProps extends ITouchable {
  item: IOrder;
}
