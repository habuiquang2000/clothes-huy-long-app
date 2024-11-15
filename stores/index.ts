import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./features/user/userSlice";
import { categoryListSlice } from "./features/category/categoryListSlice";
import { productListSlice } from "./features/product/productListSlice";
import { cartSlice } from "./features/cart/cartSlice";

import type { Action, ThunkAction } from "@reduxjs/toolkit";

const rootReducer = combineSlices(
  userSlice,
  categoryListSlice,
  productListSlice,
  cartSlice
);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
