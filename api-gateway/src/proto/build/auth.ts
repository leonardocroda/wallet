export interface LoginDto {
  password: string;
  email: string;
}

export interface Token {
  access_token: string;
}
export interface AuthService {
  Login(request: LoginDto): Promise<Token>;
}
