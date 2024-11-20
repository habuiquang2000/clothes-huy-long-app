import type { ITouchable } from "./index";

import type { IUser } from "./auth";
import type { IProduct } from "./product";
import type { ICart } from "./cart";

export interface IOrder {
  orderId?: string;
  user?: IUser | string;
  status?: "pending" | "shipped" | "delivered";
  items?: ICart[];

  amount?: number;
  discount?: number;
  shippingAddress?: string;

  country?: string;
  city?: string;
  payment_type?: "cod" | "online";
  shippedOn?: string;
  deliveredOn?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderListProps extends ITouchable {
  item: IOrder;
}
