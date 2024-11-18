import { createAppSlice } from "@/stores/createAppSlice";
import {
  getPemoveFromWishlist,
  getWishlist,
  postAddToWishlist,
} from "@/services/wishlist.service";

import type { IStoreState } from "@/types/store";
import type { IUser } from "@/types/auth";
import type { IResponse } from "@/types/network";

const initialState: IStoreState<IUser> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const wishlistSlice = createAppSlice({
  name: "wishlist",
  initialState,
  reducers: (create) => ({
    getWishlistAsync: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const result: IResponse<IUser> = await getWishlist();

        if (result.success) return result;

        return rejectWithValue(result.message);
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
    toggleWishlistAsync: create.asyncThunk(
      async (
        payload: { id: string; onWishlist: boolean },
        { rejectWithValue }
      ) => {
        if (payload.onWishlist) {
          const result: IResponse<IUser> = await getPemoveFromWishlist(
            payload.id
          );
          if (result.success) return result;

          return rejectWithValue(result.message);
        } else {
          const result: IResponse<IUser> = await postAddToWishlist({
            productId: payload.id,
            quantity: 1,
          });
          if (result.success) return result;

          return rejectWithValue(result.message);
        }
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
    selectWishlist: (wishlist) => wishlist,
  },
});

export const { getWishlistAsync, toggleWishlistAsync } = wishlistSlice.actions;

export const { selectWishlist } = wishlistSlice.selectors;
