export interface Merchant {
  name: string;
  accountNumber: string;
  icon: string;
  transactionType: TransactionType;
  categoryCode: string;
}

export type Merchants = Array<Merchant>;

export type TransactionType =
  | 'Salaries'
  | 'Card Payment'
  | 'Online Transfer'
  | 'Transaction';
