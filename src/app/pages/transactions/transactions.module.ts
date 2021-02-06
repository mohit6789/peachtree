import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { MakeTransactionComponent } from './components/make-transaction/make-transaction.component';
import { SearchboxModule } from 'src/app/shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionHistoryHeaderComponent } from './components/transaction-history-header/transaction-history-header.component';
import { SortPanelModule } from 'src/app/shared/components';
import { MakeTransactionPreviewComponent } from './components/make-transaction-preview/make-transaction-preview.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsHistoryComponent,
    MakeTransactionComponent,
    TransactionHistoryHeaderComponent,
    MakeTransactionPreviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    SearchboxModule,
    SortPanelModule,
  ],
})
export class TransactionsModule {}
