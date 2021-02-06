import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [TransactionService],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
