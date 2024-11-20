import { post } from "@/utils/fetch.base";
import type { IUser } from "@/types/auth";
import type { IResponse } from "@/types/network";

export const postSignup = (payload: IUser): Promise<IResponse<IUser>> =>
  post("/register", JSON.stringify(payload));

export const postLogin = (payload: IUser): Promise<IResponse<IUser>> =>
  post("/login", JSON.stringify(payload));

export const postLogout = (): Promise<IResponse<IUser>> => post("/logout");

export const postForgetPassword = (payload: IUser): Promise<IResponse<IUser>> =>
  post("/forget-password", JSON.stringify(payload));

export const postDeleteUser = (payload: IUser): Promise<IResponse<IUser>> =>
  post(`/delete-user?id=${payload._id}`, JSON.stringify(payload));

export const postResetPassword = (payload: IUser): Promise<IResponse<IUser>> =>
  post(`/reset-password?id=${payload._id}`, JSON.stringify(payload));
