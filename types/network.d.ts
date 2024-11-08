export interface IResponse<T> {
  success: boolean;
  status: number;
  message?: string | null;
  data: T | null;
}
