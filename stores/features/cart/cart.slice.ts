import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/stores/createAppSlice";

import type { IStoreState } from "@/types/store";
import type { ICart } from "@/types/cart";

const initialState: IStoreState<ICart[]> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addProductToCart: create.reducer((state, action: PayloadAction<ICart>) => {
      if (!state.data) state.data = [];

      state.data.push(action.payload);
    }),
  }),

  selectors: {
    selectCart: (cart) => cart,
  },
});

export const { addProductToCart } = cartSlice.actions;

export const { selectCart } = cartSlice.selectors;
