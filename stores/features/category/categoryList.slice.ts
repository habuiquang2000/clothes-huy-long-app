import { createAppSlice } from "@/stores/createAppSlice";
import { getCategoryList } from "@/services/category.service";

import type { IStoreState } from "@/types/store";
import type { ICategory } from "@/types/category";
import type { IResponse } from "@/types/network";

const initialState: IStoreState<ICategory[]> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const categoryListSlice = createAppSlice({
  name: "categoryList",
  initialState,
  reducers: (create) => ({
    getCategoryListAsync: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const result: IResponse<ICategory[]> = await getCategoryList();
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
          // state.data = action.payload.data;
          state.data = [
            {
              _id: "62fe244f58f7aa8230817f89",
              title: "Garments",
              image: "garments.png",
            },
            {
              _id: "62fe243858f7aa8230817f86",
              title: "Electornics",
              image: "electronics.png",
            },
            {
              _id: "62fe241958f7aa8230817f83",
              title: "Cosmentics",
              image: "cosmetics.png",
            },
            {
              _id: "62fe246858f7aa8230817f8c",
              title: "Groceries",
              image: "grocery.png",
            },
          ];
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        },
      }
    ),
  }),

  selectors: {
    selectCategoryList: (categoryList) => categoryList,
  },
});

export const { getCategoryListAsync } = categoryListSlice.actions;

export const { selectCategoryList } = categoryListSlice.selectors;
