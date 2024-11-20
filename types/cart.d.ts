import { ITouchable } from "./index";
import { IProduct } from "./product";

export interface ICart {
  product: IProduct;
  quantity: number;
  category?: string;
}

export interface CartProductListProps extends IProduct, ITouchable {
  disableDecrement?: boolean;
  disableIncrement?: boolean;
  handleDelete?: ((event: GestureResponderEvent) => void) | undefined;
  onPressDecrement?: ((event: GestureResponderEvent) => void) | undefined;
  onPressIncrement?: ((event: GestureResponderEvent) => void) | undefined;
}
