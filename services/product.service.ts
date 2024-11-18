import { get } from "@/utils/fetch.base";
import type { IProduct } from "@/types/product";
import type { IResponse } from "@/types/network";

export const getProductList = (): Promise<IResponse<IProduct[]>> =>
  get("/products");

export const getProductDetail = (id: string): Promise<IResponse<IProduct>> =>
  get(`/product/${id}`);
