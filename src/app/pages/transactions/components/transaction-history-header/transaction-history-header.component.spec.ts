import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';

import { TransactionHistoryHeaderComponent } from './transaction-history-header.component';

describe('TransactionHistoryHeaderComponent', () => {
  let component: TransactionHistoryHeaderComponent;
  let fixture: ComponentFixture<TransactionHistoryHeaderComponent>;
  let transactionServiceMock: any;
  beforeEach(async () => {
    transactionServiceMock = jasmine.createSpyObj('TransactionService', [
      'search',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TransactionHistoryHeaderComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class DummyClass {}
