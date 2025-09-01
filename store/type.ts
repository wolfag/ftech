export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface BalanceState {
  transactions: Transaction[];
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}
