import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { transactionSortOptions } from 'src/app/pages/transactions/data/transaction-sort-options';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';
import { SortOption, SortPreferences } from 'src/app/shared/components';

@Component({
  selector: 'app-transaction-history-header',
  templateUrl: './transaction-history-header.component.html',
  styleUrls: ['./transaction-history-header.component.scss'],
})
export class TransactionHistoryHeaderComponent implements OnInit {
  @HostBinding('class') class = 'p-t-10';

  readonly options: Array<SortOption> = transactionSortOptions;

  sortPreferences: Partial<SortPreferences> = {};
  filter: FormControl = new FormControl('');

  constructor(public transactionService: TransactionService) {}

  ngOnInit(): void {
    this.filter.valueChanges.subscribe((res) => {
      this.onChange(this.sortPreferences);
    });
  }

  onChange(sortPreferences: Partial<SortPreferences>) {
    this.sortPreferences = sortPreferences;

    this.transactionService.search(
      this.filter.value,
      sortPreferences.sortBy,
      sortPreferences.sortOrder
    );
  }
}
