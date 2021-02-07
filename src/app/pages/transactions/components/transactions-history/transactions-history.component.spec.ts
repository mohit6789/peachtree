import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';
import { Transactions } from 'src/app/pages/transactions/transactions.interfaces';
import { DOMHelper } from 'src/testing/dom-helper';

import { TransactionsHistoryComponent } from './transactions-history.component';

describe('TransactionsHistoryComponent', () => {
  let component: TransactionsHistoryComponent;
  let fixture: ComponentFixture<TransactionsHistoryComponent>;
  let transactionServiceMock: any;
  let dh: DOMHelper<TransactionsHistoryComponent>;

  beforeEach(async () => {
    transactionServiceMock = jasmine.createSpyObj('TransactionService', [
      'search',
      'transactions$',
    ]);

    transactionServiceMock.transactions$ = of([]);

    await TestBed.configureTestingModule({
      declarations: [TransactionsHistoryComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHistoryComponent);
    dh = new DOMHelper(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show two transactions records', () => {
    transactionServiceMock.transactions$ = of(transactions);
    fixture.detectChanges();
    expect(dh.count('tr')).toBe(2);
  });
});

const transactions: Transactions = [
  {
    categoryCode: '#12a580',
    dates: {
      valueDate: 1600493600000,
    },
    transaction: {
      amountCurrency: {
        amount: 5000,
        currencyCode: 'EUR',
      },
      type: 'Salaries',
      creditDebitIndicator: 'CRDT',
    },
    merchant: {
      name: 'Backbase',
      accountNumber: 'SI64397745065188826',
    },
  },
  {
    categoryCode: '#12a580',
    dates: {
      valueDate: 1600387200000,
    },
    transaction: {
      amountCurrency: {
        amount: 82.02,
        currencyCode: 'EUR',
      },
      type: 'Card Payment',
      creditDebitIndicator: 'DBIT',
    },
    merchant: {
      name: 'The Tea Lounge',
      accountNumber: 'SI64397745065188826',
    },
  },
];
