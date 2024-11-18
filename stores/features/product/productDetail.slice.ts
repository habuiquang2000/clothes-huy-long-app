import { createAppSlice } from "@/stores/createAppSlice";
import { getProductDetail } from "@/services/product.service";

import type { IStoreState } from "@/types/store";
import type { IProduct } from "@/types/product";
import type { IResponse } from "@/types/network";

const initialState: IStoreState<IProduct> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const productDetailSlice = createAppSlice({
  name: "productDetail",
  initialState,
  reducers: (create) => ({
    getProductDetailAsync: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        const result: IResponse<IProduct> = await getProductDetail(id);
        if (!result.success) return rejectWithValue(result.message);

        return result;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "success";
          state.status = "idle";
          state.data = action.payload.data;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        },
      }
    ),
  }),

  selectors: {
    selectProductDetail: (productDetail) => productDetail,
  },
});

export const { getProductDetailAsync } = productDetailSlice.actions;

export const { selectProductDetail } = productDetailSlice.selectors;
