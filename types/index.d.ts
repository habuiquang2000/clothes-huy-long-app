import type { NavigationProp } from "@react-navigation/native";
import type { ImageSourcePropType } from "react-native";

export interface INestedRoute {
  screen?: string;
  params?: any;
}

export interface INavigationParams {
  login: undefined; //current screen
  signup: undefined;
  forgetPassword: undefined;
  user: INestedRoute;
  myAccount: {
    user: any;
  };
  product: INestedRoute
  ScreenThree: {
    data: Array<string>;
  };
}

export type INavigationPropParams = NavigationProp<INavigationParams> & {
  replace: CallableFunction;
};

export type IAlertType = "error" | "success";

export interface ICustomAlertProps {
  message: string | null;
  type: IAlertType;
}

export interface ITouchable {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onPressSecondary?: ((event: GestureResponderEvent) => void) | undefined;
}

export interface IOptionListProps extends ITouchable {
  iconName: any;
  text: string;
  type?: "morden" | "danger";
}

export interface ICustomIconButtonProps extends ITouchable {
  text: string;
  image: ImageSourcePropType | string | undefined;
  active?: boolean;
}
