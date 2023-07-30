export enum SetBalanceAction {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

export interface Message {
  action: SetBalanceAction;
  amount: number;
  accountId: number;
}

export interface SetBalanceProducer {
  setBalance(message: Message): Promise<void>;
}
