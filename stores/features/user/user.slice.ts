import { createAppSlice } from "@/stores/createAppSlice";
import { UserStore } from "@/utils/storage";
import {
  postForgetPassword,
  postLogin,
  postLogout,
  postSignup,
} from "@/services/auth.service";

import type { IStoreState } from "@/types/store";
import type { IUser } from "@/types/auth";
import type { IResponse } from "@/types/network";

const initialState: IStoreState<IUser> = {
  data: null,
  error: undefined,
  status: "idle",
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    // STORAGE
    getUserAsync: create.asyncThunk(
      async () => {
        const value = await new UserStore().get();

        const user: IUser = value != null ? JSON.parse(value) : value;

        return user;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "success";
          state.status = "idle";
          state.data = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    setUserAsync: create.asyncThunk(
      async (payload: IUser | null) => {
        await new UserStore().set(JSON.stringify(payload));
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "success";
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    removeUserAsync: create.asyncThunk(
      async () => {
        await new UserStore().remove();
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "success";
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),

    // AUTH
    loginUserAsync: create.asyncThunk(
      async (payload: IUser, { rejectWithValue }) => {
        const result: IResponse<IUser> = await postLogin(payload);
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
    signupUserAsync: create.asyncThunk(
      async (payload: IUser, { rejectWithValue }) => {
        const result: IResponse<IUser> = await postSignup(payload);
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
    forgetPasswordUserAsync: create.asyncThunk(
      async (payload: IUser, { rejectWithValue }) => {
        const result: IResponse<IUser> = await postForgetPassword(payload);
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
    logoutUserAsync: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        // const result: IResponse<IUser> = await postLogout();
        const result: IResponse<IUser> = await Promise.resolve({
          status: 200,
          success: true,
          data: null,
        });
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
    selectUser: (user) => user,
  },
});

export const {
  getUserAsync,
  setUserAsync,
  removeUserAsync,

  loginUserAsync,
  signupUserAsync,
  forgetPasswordUserAsync,
  logoutUserAsync,
} = userSlice.actions;

export const { selectUser } = userSlice.selectors;
