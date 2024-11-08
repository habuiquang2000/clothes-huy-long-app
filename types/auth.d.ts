export interface IUser {
  email?: string;
  password?: string;
  name?: string;
  userType?: "USER" | "ADMIN";
}

export interface UserProfileCardProps extends IUser {}
