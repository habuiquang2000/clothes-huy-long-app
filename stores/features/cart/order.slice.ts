import { createAppSlice } from "@/stores/createAppSlice";
import { postCheckout, getOrderList } from "@/services/order.service";

import type { IResponse } from "@/types/network";
import type { IStoreState } from "@/types/store";
import type { IOrder } from "@/types/order";

const initialState: IStoreState<IOrder[]> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const orderSlice = createAppSlice({
  name: "order",
  initialState,

  reducers: (create) => ({
    orderFetchAsync: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const result: IResponse<IOrder[]> = await getOrderList();

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
    orderCreateAsync: create.asyncThunk(
      async (payload: IOrder, { rejectWithValue }) => {
        const result: IResponse<IOrder> = await postCheckout(payload);
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
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        },
      }
    ),
  }),

  selectors: {
    selectOrder: (order) => order,
  },
});

export const { orderFetchAsync, orderCreateAsync } = orderSlice.actions;

export const { selectOrder } = orderSlice.selectors;
