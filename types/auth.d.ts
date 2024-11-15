export interface IUser {
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatarLinh?: string;
  name?: string;
  userType?: "USER" | "ADMIN";
}

export interface UserProfileCardProps extends IUser {}
