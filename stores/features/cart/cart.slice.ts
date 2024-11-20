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

      const itemIndex = state.data.findIndex(
        (item) => item.product._id === action.payload.product._id
      );

      if (itemIndex != -1)
        state.data[itemIndex].quantity += action.payload.quantity;
      else state.data.push(action.payload);
    }),
    decreaseProductInCart: create.reducer(
      (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        if (!state.data) state.data = [];
        const itemIndex = state.data.findIndex(
          (item) => item.product._id === action.payload.id
        );
        if (itemIndex != -1)
          state.data[itemIndex].quantity -= action.payload.quantity;
      }
    ),
    removeProductInCart: create.reducer(
      (state, action: PayloadAction<string>) => {
        if (!state.data) state.data = [];
        const itemIndex = state.data.findIndex(
          (item) => item.product._id === action.payload
        );
        if (itemIndex != -1) state.data.splice(itemIndex, 1);
      }
    ),
    emptyCart: create.reducer((state, action: PayloadAction) => {
      state.data = [];
    }),
  }),

  selectors: {
    selectCart: (cart) => cart,
  },
});

export const {
  addProductToCart,
  decreaseProductInCart,
  removeProductInCart,
  emptyCart,
} = cartSlice.actions;

export const { selectCart } = cartSlice.selectors;
