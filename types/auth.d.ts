import type { IProduct } from "./product";

export interface IUser {
  _id?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  avatarLinh?: string;
  name?: string;
  userType?: "USER" | "ADMIN";
  token?: string;
  wishlist?: {
    product: IProduct;
    quantity: number;
  }[];
}

export interface UserProfileCardProps extends IUser {}
