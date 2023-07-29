import { Transaction } from '../entity/transaction.entity';
import { TransferEntity } from '../entity/transfer.entity';
import { UpsertStatementTransactionRepository } from '../gateways/repositories/upsert-statement-transaction-repository';

export class SaveTransferInStatementUsecase {
  constructor(
    private readonly upsertStatementTransaction: UpsertStatementTransactionRepository,
  ) {}
  async execute(transfer: TransferEntity) {
    const transaction = this.mapTransferToStatementTransaction(transfer);

    await this.upsertStatementTransaction.upsertStatementTransaction(
      transaction,
    );
  }

  private mapTransferToStatementTransaction(
    transfer: TransferEntity,
  ): Transaction {
    return new Transaction({
      accountId: transfer.accountId,
      amount: transfer.amount,
      date: transfer.date,
      sourceDestinationName: transfer.sourceDestinationName,
      status: transfer.status,
      type: transfer.type,
      transferId: transfer.id,
    });
  }
}
