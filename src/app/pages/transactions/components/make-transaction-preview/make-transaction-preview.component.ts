import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { USER_CURRENCY_CODE } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-make-transaction-preview',
  templateUrl: './make-transaction-preview.component.html',
  styleUrls: ['./make-transaction-preview.component.scss'],
})
export class MakeTransactionPreviewComponent implements OnInit {
  readonly currencyCode: string = USER_CURRENCY_CODE;

  @Input()
  fromAccount: string = 'Mohit';

  @Input()
  toAccount: string = 'xyz';

  @Input()
  amount: string = '1000';

  @Output()
  transfer: EventEmitter<void> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCancel(): void {
    this.cancel.emit();
  }

  onTransfer(): void {
    this.transfer.emit();
  }
}
