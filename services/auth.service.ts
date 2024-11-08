import { post } from "@/utils/fetch.base";
import type { IUser } from "@/types/auth";
import type { IResponse } from "@/types/network";

export const postSignup = (payload: IUser): Promise<IResponse<IUser>> =>
  post("/register", JSON.stringify(payload));

export const postLogin = (payload: IUser): Promise<IResponse<IUser>> =>
  post("/login", JSON.stringify(payload));

export const postLogout = (): Promise<IResponse<IUser>> => post("/logout");

export const postForgetPassword = () => {};
