export interface AdminInterface {
  name: string;
  username: string;
  email: string;
  age: number;
  gender: string;
}

export interface AdminResInterface {
  user: AdminInterface;
  token: string;
}
