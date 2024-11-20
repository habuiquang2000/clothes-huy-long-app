import { UserStore } from "@/utils/storage";
import { get, post } from "@/utils/fetch.base";

import type { IResponse } from "@/types/network";
import type { IOrder } from "@/types/order";
import type { IUser } from "@/types/auth";

export const postCheckout = async ({
  items: itemCart,
  country,
  city,
  shippingAddress,
}: IOrder): Promise<IResponse<IOrder>> => {
  const value = await new UserStore().get();

  const user: IUser = value != null ? JSON.parse(value) : value;

  const { items, amount }: any = itemCart?.reduce(
    (accumulator: IOrder, object: any) => {
      accumulator.items?.push({
        product: object.product._id,
        price: object.product.price,
        quantity: object.quantity,
      } as any);

      accumulator.amount! += object.product.price * object.quantity;

      return accumulator;
    },
    {
      items: [],
      amount: 0,
    }
  );

  return post(
    "/checkout",
    JSON.stringify({
      items,
      amount,
      discount: 0,
      payment_type: "cod",
      status: "pending",
      country,
      city,
      shippingAddress,
    }),
    {
      "x-auth-token": user.token,
    }
  );
};

export const getOrderList = async (): Promise<IResponse<IOrder[]>> => {
  const value = await new UserStore().get();

  const user: IUser = value != null ? JSON.parse(value) : value;

  return get("/orders", {
    "x-auth-token": user.token,
  });
};
