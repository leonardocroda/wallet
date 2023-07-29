/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetUserByEmailRepository } from '../gateways/get-user-by-email-repository';

export class ValidateUserUsecase {
  constructor(private getUserByEmailRepository: GetUserByEmailRepository) {}
  async execute(email: string, pass: string) {
    const user = await this.getUserByEmailRepository.getUserByEmail(email);
    console.log({ user });

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
