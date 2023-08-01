import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import {
  PurchaseStatus,
  PurchaseType,
  Purchase,
} from '../entity/purchase.entity';
import {
  SetBalanceAction,
  SetBalanceProducer,
} from '../gateways/producers/set-balance-producer';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';
import { FindOneTransactionRepository } from '../gateways/repositories/find-one-transaction-repository';

export class SavePurchaseOnStatementUsecase {
  constructor(
    private readonly upsertTransaction: UpsertTransactionRepository,
    private readonly setBalanceProducer: SetBalanceProducer,
    private readonly findOneTransactionRepository: FindOneTransactionRepository,
  ) {}
  async execute(
    purchase: Purchase,
    accountId: number,
  ): Promise<{ status: number }> {
    const transaction = this.mapPurchaseToTransaction(purchase);

    const existentTransaction = await this.findOneTransactionRepository.findOne(
      transaction.id,
    );

    if (existentTransaction) {
      return { status: 409 };
    }

    await this.upsertTransaction.upsertTransaction(transaction);

    await this.setBalanceProducer.setBalance({
      amount: purchase.amount,
      action: this.getSetBalanceAction(purchase),
      accountId,
    });

    return { status: 201 };
  }

  private mapPurchaseToTransaction(purchase: Purchase): Transaction {
    return new Transaction({
      accountId: purchase.accountId,
      amount: purchase.amount,
      date: purchase.date,
      sourceDestinationName: purchase.merchantName,
      status: TransactionStatus[purchase.status],
      type: TransactionType[purchase.type],
      externalId: purchase.id,
    });
  }

  private getSetBalanceAction(purchase: Purchase) {
    if (purchase.type === PurchaseType.PURCHASE) {
      if (purchase.status === PurchaseStatus.CANCELED) {
        return SetBalanceAction.ADD;
      }
      return SetBalanceAction.SUBTRACT;
    }

    if (purchase.type === PurchaseType.REFUND) {
      if (purchase.status === PurchaseStatus.CANCELED) {
        return SetBalanceAction.SUBTRACT;
      }
      return SetBalanceAction.ADD;
    }
  }
}
