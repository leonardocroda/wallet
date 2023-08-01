import { Controller, Get, Req, Res } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetBalanceResponse } from './dto/get-balance.dto';
import { AccountServiceImpl } from './account.service';
import { AuthenticationService } from 'src/auth/authentication.service';
import { Request, Response } from 'express';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountServiceImpl,
    private readonly authService: AuthenticationService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Balance',
    type: GetBalanceResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get('/balance')
  async savePurchaseOnStatement(@Req() req: Request, @Res() resp: Response) {
    const user = await this.authService.validateToken(req);
    if (user) {
      const balance = await this.accountService.getBalance({
        accountId: user.accountId,
      });
      return resp.status(200).json(balance);
    }

    return resp.status(401).send();
  }
}
