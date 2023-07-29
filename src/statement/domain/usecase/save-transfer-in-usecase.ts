import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import { TransferEntity } from '../entity/transfer.entity';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';

export class SaveTransferInUsecase {
  constructor(
    private readonly upsertTransaction: UpsertTransactionRepository,
  ) {}
  async execute(transfer: TransferEntity) {
    const transaction = this.mapTransferToTransaction(transfer);

    await this.upsertTransaction.upsertTransaction(transaction);
  }

  private mapTransferToTransaction(transfer: TransferEntity): Transaction {
    return new Transaction({
      accountId: transfer.accountId,
      amount: transfer.amount,
      date: transfer.date,
      sourceDestinationName: transfer.sourceDestinationName,
      status: TransactionStatus[transfer.status],
      type: TransactionType[transfer.type],
      transferId: transfer.id,
    });
  }
}
