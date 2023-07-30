import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../entity/transaction.entity';
import {
  TransferEntity,
  TransferStatus,
  TransferType,
} from '../entity/transfer.entity';
import {
  SetBalanceAction,
  SetBalanceProducer,
} from '../gateways/producers/set-balance-producer';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';

export class SaveTransferOnStatementUseCase {
  constructor(
    private readonly upsertTransaction: UpsertTransactionRepository,
    private readonly setBalanceProducer: SetBalanceProducer,
  ) {}
  async execute(transfer: TransferEntity, accountId: number) {
    const transaction = this.mapTransferToTransaction(transfer);

    await this.upsertTransaction.upsertTransaction(transaction);

    await this.setBalanceProducer.setBalance({
      amount: transfer.amount,
      action: this.getSetBalanceAction(transfer),
      accountId,
    });
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

  private getSetBalanceAction(transfer: TransferEntity) {
    if (transfer.status === TransferStatus.CANCELED) {
      return SetBalanceAction.ADD;
    }

    if (transfer.type === TransferType.TRANSFER_IN) {
      return SetBalanceAction.ADD;
    }

    if (transfer.type === TransferType.TRANSFER_OUT) {
      return SetBalanceAction.SUBTRACT;
    }
  }
}
