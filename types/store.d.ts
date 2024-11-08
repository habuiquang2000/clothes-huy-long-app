export type StoreStatus = "idle" | "loading" | "success" | "failed";
// export type StoreStatus = "idle" | "pending" | "fulfilled" | "rejected"w;

export interface IStoreState<T> {
  data: T | null;
  status: StoreStatus;
  error: string | null | undefined;
}
