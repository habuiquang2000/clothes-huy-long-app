import { ITouchable } from "./index";
import { IProduct } from "./product";

export interface CartProductListProps extends IProduct, ITouchable {
  handleDelete?: ((event: GestureResponderEvent) => void) | undefined;
  onPressDecrement?: ((event: GestureResponderEvent) => void) | undefined;
  onPressIncrement?: ((event: GestureResponderEvent) => void) | undefined;
}
