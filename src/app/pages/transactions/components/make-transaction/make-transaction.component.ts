import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { getCreditorMerchants } from 'src/app/pages/transactions/data/merchants.mock';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';
import { TransactionItem } from 'src/app/pages/transactions/transactions.interfaces';
import { USER_CURRENCY_CODE } from 'src/app/shared/constants/constants';
import {
  Merchant,
  Merchants,
} from 'src/app/shared/interfaces/merchant.interfaces';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss'],
})
export class MakeTransactionComponent implements OnInit {
  private readonly OVERDRAFT_LIMIT = -500;
  readonly currencyCode: string = USER_CURRENCY_CODE;
  readonly fromAccount: string = 'Free Checking(4692)';

  message: string = '';
  hasError: boolean = false;
  showPreview: boolean = false;

  creditorMerchants: Merchants = getCreditorMerchants();

  makeTransactionFormGroup = new FormGroup({
    toAccount: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  constructor(public transactionService: TransactionService) {}

  ngOnInit(): void {}

  get toAccount(): AbstractControl | null {
    return this.makeTransactionFormGroup.get('toAccount');
  }

  get amount(): AbstractControl | null {
    return this.makeTransactionFormGroup.get('amount');
  }

  submitForm(): void {
    this.message = '';
    this.hasError = false;

    if (this.makeTransactionFormGroup.invalid) {
      this.makeTransactionFormGroup.markAllAsTouched();
      return;
    }

    this.validateTransactionAmount()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.showPreview = true;
        } else {
          this.hasError = true;
          this.message = 'Overdraft limit exceeds.';
        }
      });
  }

  cancelTransfer() {
    this.showPreview = false;
  }

  transfer() {
    const merchant: Merchant = <Merchant>(
      this.creditorMerchants.find((m) => m.name === this.toAccount?.value)
    );

    if (!merchant) {
      console.error(`${this.toAccount?.value} Merchant not found....`);
    }

    const transaction: TransactionItem = this.prepareTransaction(merchant);
    this.makeTransactionFormGroup.reset();

    const updatedTransaction: TransactionItem = this.transactionService.makeTransaction(
      transaction
    );
    if (updatedTransaction) {
      this.message = `Your tranaction has successfully completed.`;
      this.hasError = false;
      this.showPreview = false;
    }
  }

  private prepareTransaction(merchant: Merchant): TransactionItem {
    return {
      categoryCode: merchant.categoryCode,
      dates: {
        valueDate: new Date().getTime(),
      },
      merchant: {
        accountNumber: merchant.accountNumber,
        name: merchant.name,
      },
      transaction: {
        amountCurrency: {
          amount: this.amount?.value,
          currencyCode: USER_CURRENCY_CODE,
        },
        creditDebitIndicator: 'DBIT',
        type: merchant.transactionType,
      },
    };
  }

  private validateTransactionAmount() {
    return this.transactionService.accountBalance$.pipe(
      first(),
      map((amount) => {
        return (
          this.amount && amount - this.amount.value >= this.OVERDRAFT_LIMIT
        );
      })
    );
  }
}
