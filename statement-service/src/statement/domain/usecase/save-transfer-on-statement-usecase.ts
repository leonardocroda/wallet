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
import { FindOneTransactionRepository } from '../gateways/repositories/find-one-transaction-repository';
import { UpsertTransactionRepository } from '../gateways/repositories/upsert-transaction-repository';

export class SaveTransferOnStatementUseCase {
  constructor(
    private readonly upsertTransaction: UpsertTransactionRepository,
    private readonly setBalanceProducer: SetBalanceProducer,
    private readonly findOneTransactionRepository: FindOneTransactionRepository,
  ) {}
  async execute(transfer: TransferEntity, accountId: number) {
    const transaction = this.mapTransferToTransaction(transfer);

    const existentTransaction = this.findOneTransactionRepository.findOne(
      transaction.id,
    );

    if (existentTransaction) {
      return;
    }

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
      externalId: transfer.id,
    });
  }

  private getSetBalanceAction(transfer: TransferEntity) {
    if (transfer.type === TransferType.TRANSFER_IN) {
      if (transfer.status === TransferStatus.CANCELED) {
        return SetBalanceAction.SUBTRACT;
      }
      return SetBalanceAction.ADD;
    }

    if (transfer.type === TransferType.TRANSFER_OUT) {
      if (transfer.status === TransferStatus.CANCELED) {
        return SetBalanceAction.ADD;
      }
      return SetBalanceAction.SUBTRACT;
    }
  }
}
