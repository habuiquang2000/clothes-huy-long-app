import { get } from "@/utils/fetch.base";
import type { ICategory } from "@/types/category";
import type { IResponse } from "@/types/network";

export const getCategoryList = (): Promise<IResponse<ICategory[]>> =>
  get("/categories");
