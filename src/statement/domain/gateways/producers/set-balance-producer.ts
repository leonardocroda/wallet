export enum SetBalanceAction {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

export interface Message {
  action: SetBalanceAction;
  amount: number;
}

export interface SetBalanceProducer {
  setBalance(message: Message): Promise<void>;
}
