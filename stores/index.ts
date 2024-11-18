import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./features/user/user.slice";
import { categoryListSlice } from "./features/category/categoryList.slice";
import { productListSlice } from "./features/product/productList.slice";
import { productDetailSlice } from "./features/product/productDetail.slice";
import { wishlistSlice } from "./features/product/wishlist.slice";
import { cartSlice } from "./features/cart/cart.slice";

import type { Action, ThunkAction } from "@reduxjs/toolkit";

const rootReducer = combineSlices(
  userSlice,
  categoryListSlice,
  productListSlice,
  productDetailSlice,
  wishlistSlice,
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
