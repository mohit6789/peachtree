import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import {
  TransactionItem,
  Transactions,
  TransactionSearchAndSortOptions,
} from 'src/app/pages/transactions/transactions.interfaces';
import { SortOrder } from 'src/app/shared/components';
import { sort } from 'src/app/shared/utilities';

@Injectable()
export class TransactionService {
  private readonly defaultSearchAndSortOptions: TransactionSearchAndSortOptions = {
    searchValue: '',
    sortBy: 'DATE',
    sortOrder: 'DESC',
  };

  private searchAndSortOptionsSubject$: BehaviorSubject<TransactionSearchAndSortOptions> = new BehaviorSubject<TransactionSearchAndSortOptions>(
    this.defaultSearchAndSortOptions
  );
  private originalTransactionsSubject$: BehaviorSubject<Transactions> = new BehaviorSubject<Transactions>(
    []
  );
  private transactionsSubject$: BehaviorSubject<Transactions> = new BehaviorSubject<Transactions>(
    []
  );

  searchAndSortOptions$: Observable<TransactionSearchAndSortOptions> = this.searchAndSortOptionsSubject$.asObservable();
  accountBalance$: Observable<number> = this.originalTransactionsSubject$.pipe(
    map((transactions) => this.calculateAccountBalance(transactions))
  );

  transactions$: Observable<Transactions> = this.transactionsSubject$.asObservable();

  constructor(private http: HttpClient) {
    this.init();
  }

  private calculateAccountBalance(transactions: Transactions): number {
    return transactions.reduce((total, transaction) => {
      if (transaction.transaction.creditDebitIndicator === 'CRDT') {
        return total + +transaction.transaction.amountCurrency.amount;
      } else {
        return total - +transaction.transaction.amountCurrency.amount;
      }
    }, 0);
  }

  private init() {
    this.http
      .get<{ data: Transactions }>('assets/json/transactions.json')
      .pipe(
        map((res) => res.data),
        tap((transactions) => {
          this.originalTransactionsSubject$.next(transactions);
        })
      )
      .subscribe(() => this.search(''));
  }

  makeTransaction(transactionItem: TransactionItem): TransactionItem {
    const transactions: Transactions = [
      ...(this.originalTransactionsSubject$.value || []),
    ];
    transactions.unshift(transactionItem);
    this.originalTransactionsSubject$.next(transactions);
    this.search('');
    return transactionItem;
  }

  search(
    searchValue: string,
    sortBy: string = this.defaultSearchAndSortOptions.sortBy,
    sortOrder: SortOrder = this.defaultSearchAndSortOptions.sortOrder
  ) {
    this.searchAndSortOptionsSubject$.next({ searchValue, sortBy, sortOrder });

    this.originalTransactionsSubject$
      .pipe(
        first(),
        map((transactions) =>
          searchValue ? this.filter(transactions, searchValue) : transactions
        ),
        map((transactions) =>
          this.sortTransasctions(transactions, sortBy, sortOrder)
        )
      )
      .subscribe((trasactions) => this.transactionsSubject$.next(trasactions));
  }

  private filter(trasactions: Transactions, searchValue: string): Transactions {
    return trasactions.filter((t) => {
      return (
        t.merchant.name
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        t.transaction.type
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
    });
  }

  private sortTransasctions(
    trasactions: Transactions,
    sortBy: string = 'DATE',
    sortOrder: SortOrder = 'DESC'
  ) {
    let getValue: (data: TransactionItem) => any;
    switch (sortBy) {
      case 'BENEFICIARY':
        getValue = (data: TransactionItem) => data.merchant.name;
        break;
      case 'AMOUNT':
        getValue = (data: TransactionItem) =>
          +data.transaction.amountCurrency.amount;
        break;
      case 'DATE':
      default:
        getValue = (data: TransactionItem) =>
          new Date(data.dates.valueDate).getTime();
    }

    return trasactions.sort((a, b) => sort(a, b, sortOrder, getValue));
  }
}
