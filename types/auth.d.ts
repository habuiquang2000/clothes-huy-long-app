import type { IProduct } from "./product";

export interface IUser {
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  avatarLinh?: string;
  name?: string;
  userType?: "USER" | "ADMIN";
  token?: string;
  wishlist?: {
    productId: IProduct;
    quantity: number;
  }[];
}

export interface UserProfileCardProps extends IUser {}
