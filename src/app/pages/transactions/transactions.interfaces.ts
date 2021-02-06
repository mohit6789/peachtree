import { SortOrder } from 'src/app/shared/components';
import { TransactionType } from 'src/app/shared/interfaces/merchant.interfaces';

export type Transactions = Array<TransactionItem>;

export interface TransactionItem {
  categoryCode: string;
  dates: TransactionDates;
  transaction: TransactionDetails;
  merchant: TransactionMerchant;
}

export interface TransactionDates {
  valueDate: string | number;
}

export interface TransactionDetails {
  amountCurrency: TransactionAmount;
  type: TransactionType;
  creditDebitIndicator: 'CRDT' | 'DBIT';
}

export interface TransactionAmount {
  amount: number;
  currencyCode: string;
}

export interface TransactionMerchant {
  name: string;
  accountNumber: string;
}

export interface TransactionSearchAndSortOptions {
  searchValue: string;
  sortBy: any;
  sortOrder: SortOrder;
}
