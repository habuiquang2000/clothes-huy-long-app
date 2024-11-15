// import { createAppSlice } from "@/stores/createAppSlice";
// import { getProductList } from "@/services/product.service";

// import type { IStoreState } from "@/types/store";
// import type { IProduct } from "@/types/product";
// import type { IResponse } from "@/types/network";

// const initialState: IStoreState<IProduct> = {
//   data: null,
//   error: undefined,
//   status: "idle",
// };

// export const productListSlice = createAppSlice({
//   name: "product",
//   initialState,
//   reducers: (create) => ({
//     getProductListAsync: create.asyncThunk(
//       async (_, { rejectWithValue }) => {
//         const result: IResponse<IProduct[]> = await getProductList();
//         if (!result.success) return rejectWithValue(result.message);

//         return result;
//       },
//       {
//         pending: (state) => {
//           state.status = "loading";
//         },
//         fulfilled: (state, action) => {
//           state.status = "success";
//           state.status = "idle";
//           state.data = action.payload.data;
//         },
//         rejected: (state, action) => {
//           state.status = "failed";
//           state.error = action.payload as string;
//         },
//       }
//     ),
//   }),

//   selectors: {
//     selectProductList: (productList) => productList,
//   },
// });

// export const { getProductListAsync } = productListSlice.actions;

// export const { selectProductList } = productListSlice.selectors;
