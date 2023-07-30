export interface LoginDto {
  password: string;
  email: string;
}

export interface Token {
  access_token: string;
}
export interface UserService {
  Login(request: LoginDto): Promise<Token>;
}
