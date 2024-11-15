import type { ITouchable } from "./index";

import type { IUser } from "./auth";
import type { IProduct } from "./product";

export interface IOrderItem extends IProduct {}

export interface IOrder {
  orderId: any;
  user: IUser;
  status: string;
  createdAt: Date;
  items: IOrderItem[];
}

export interface IOrderListProps extends ITouchable {
  item: IOrder;
}
