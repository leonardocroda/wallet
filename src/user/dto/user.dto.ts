export class UserDto {
  email?: string;

  password?: string;

  firstName?: string;

  lastName?: string;

  isActive?: boolean;
}

export class LoginDto {
  email: string;

  password: string;
}
