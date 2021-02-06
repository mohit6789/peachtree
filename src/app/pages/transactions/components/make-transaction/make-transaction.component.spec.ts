import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';

import { MakeTransactionComponent } from './make-transaction.component';

describe('MakeTransactionComponent', () => {
  let component: MakeTransactionComponent;
  let fixture: ComponentFixture<MakeTransactionComponent>;
  let transactionServiceMock: any;
  beforeEach(async () => {
    transactionServiceMock = jasmine.createSpyObj('TransactionService', [
      'search',
    ]);
    await TestBed.configureTestingModule({
      declarations: [MakeTransactionComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
