export interface LoginDto {
  password: string;
  email: string;
}

export interface Token {
  access_token: string;
}
export interface User {
  accountId: number;
  id: number;
  email: string;
}
export interface AuthService {
  Login(request: LoginDto): Promise<Token>;
  ValidateToken(request: Token): Promise<User>;
}
