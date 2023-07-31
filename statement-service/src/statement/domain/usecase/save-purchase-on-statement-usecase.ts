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

export class SavePurchaseOnStatementUsecase {
  constructor(
    private readonly upsertTransaction: UpsertTransactionRepository,
    private readonly setBalanceProducer: SetBalanceProducer,
  ) {}
  async execute(purchase: Purchase, accountId: number) {
    const transaction = this.mapPurchaseToTransaction(purchase);

    await this.upsertTransaction.upsertTransaction(transaction);

    await this.setBalanceProducer.setBalance({
      amount: purchase.amount,
      action: this.getSetBalanceAction(purchase),
      accountId,
    });
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
    if (purchase.status === PurchaseStatus.CANCELED) {
      return SetBalanceAction.ADD;
    }

    if (purchase.type === PurchaseType.PURCHASE) {
      return SetBalanceAction.SUBTRACT;
    }

    if (purchase.type === PurchaseType.REFUND) {
      return SetBalanceAction.ADD;
    }
  }
}
