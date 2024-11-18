import { UserStore } from "@/utils/storage";
import { get, post } from "@/utils/fetch.base";

import type { IResponse } from "@/types/network";
import type { IUser } from "@/types/auth";

export const getWishlist = async (): Promise<IResponse<IUser>> => {
  const value = await new UserStore().get();

  const user: IUser = value != null ? JSON.parse(value) : value;
  return get("/wishlist", {
    "x-auth-token": user.token,
  });
};
export const getPemoveFromWishlist = async (
  id: string
): Promise<IResponse<IUser>> => {
  const value = await new UserStore().get();

  const user: IUser = value != null ? JSON.parse(value) : value;
  return get(`/remove-from-wishlist?id=${id}`, {
    "x-auth-token": user.token,
  });
};
export const postAddToWishlist = async (
  payload: any
): Promise<IResponse<IUser>> => {
  const value = await new UserStore().get();

  const user: IUser = value != null ? JSON.parse(value) : value;
  return post("/add-to-wishlist", JSON.stringify(payload), {
    "x-auth-token": user.token,
  });
};
