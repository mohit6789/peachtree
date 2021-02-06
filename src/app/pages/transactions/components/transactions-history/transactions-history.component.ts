import { Component, OnInit } from '@angular/core';

import { TransactionService } from 'src/app/pages/transactions/transaction.service';
import { getMerchantNameAndMarchantMap } from '../../data/merchants.mock';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit {
  private merchantNameAndMerchantMap: Map<
    string,
    object
  > = getMerchantNameAndMarchantMap();

  constructor(public transactionService: TransactionService) {}

  ngOnInit(): void {}

  getMerchantIcon(merchantName: string) {
    const merchant: any = this.merchantNameAndMerchantMap.get(merchantName);

    if (merchant) {
      return merchant.icon;
    }
  }
}
