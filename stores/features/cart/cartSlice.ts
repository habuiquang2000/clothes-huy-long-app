import { createAppSlice } from "@/stores/createAppSlice";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { IStoreState } from "@/types/store";
import type { IProduct } from "@/types/product";

const initialState: IStoreState<IProduct[]> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addProductToCart: create.reducer(
      (state, action: PayloadAction<IProduct>) => {
        if (!state.data) state.data = [];

        state.data.push(action.payload);
      }
    ),
  }),

  selectors: {
    selectCart: (cart) => cart,
  },
});

export const { addProductToCart } = cartSlice.actions;

export const { selectCart } = cartSlice.selectors;
