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
        console.log(result);
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
    selectCategoryList: (categoryList) => categoryList,
  },
});

export const { getCategoryListAsync } = categoryListSlice.actions;

export const { selectCategoryList } = categoryListSlice.selectors;
