export interface ILoginPayload {
  login: string;
  password: string;
}

export interface IUser {
  email: string
  status: 'online' | 'offline';
}