import { ITouchable } from "./index";

export interface IDashboardProps {
  id?: number;
  title: string;
  value?: string;
  iconName: any;
  type: "primary" | "secondary" | "warning" | "muted";
  screenName?: string;
}

export interface CustomCardProps extends IDashboardProps, ITouchable {}
