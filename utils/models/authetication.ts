export type User = {
  userId: string;
  username: string;
  name: string;
  phoneNumber: string;
  role: string;
};

export type LoginModel = {
  token: string;
  user: User;
  message: string;
};
