import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TransactionService } from './transaction.service';

// @ts-ignore
import * as myJson from '../../../assets/json/transactions.json';
import {
  TransactionItem,
  Transactions,
} from 'src/app/pages/transactions/transactions.interfaces';
import { TransactionType } from 'src/app/shared/interfaces/merchant.interfaces';

describe('TransactionsService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    // service = TestBed.inject(TransactionService);
  });

  beforeEach(() => {
    service = TestBed.inject(TransactionService);
    httpMock
      .expectOne('assets/json/transactions.json')
      .flush({ data: transactionsMock });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate accountBalance ', (done) => {
    service.accountBalance$.subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toBe(5000 - 82.02 - 84.64);
      done();
    });
  });

  describe('Search and Sort', () => {
    it('should filter the data and emit the filtered data.', (done) => {
      service.search('Backbase');

      service.transactions$.subscribe((res) => {
        expect(res.length).toEqual(1);
        expect(res[0]).toEqual(transactionsMock[0]);
        done();
      });
    });

    it('should sort the data by AMOUNT and emit the sort data.', (done) => {
      service.search('', 'AMOUNT', 'ASC');

      service.transactions$.subscribe((res) => {
        expect(res.length).toEqual(3);
        expect(
          res.map((res) => res.transaction.amountCurrency.amount)
        ).toEqual([82.02, 84.64, 5000]);
        done();
      });
    });

    it('should sort the data by BENEFICIARY and emit the sort data.', (done) => {
      service.search('', 'BENEFICIARY', 'DESC');

      service.transactions$.subscribe((res) => {
        expect(res.length).toEqual(3);
        expect(res.map((res) => res.merchant.name)).toEqual([
          'The Tea Lounge',
          'Texaco',
          'Backbase',
        ]);
        done();
      });
    });
  });

  it('should make payment and new transaction should be appear on the top', (done) => {
    const mockTransaction: TransactionItem = {
      categoryCode: '#781232',
      dates: {
        valueDate: new Date().getTime(),
      },
      merchant: {
        accountNumber: 'test',
        name: 'Jerry Hildreth',
      },
      transaction: {
        amountCurrency: {
          amount: 10.15,
          currencyCode: 'EUR',
        },
        creditDebitIndicator: 'DBIT',
        type: 'Online Transfer',
      },
    };
    service.makeTransaction(mockTransaction);
    service.transactions$.subscribe((res) => {
      expect(res.length).toBe(4);
      expect(res[0].merchant.accountNumber).toBe('test');
      done();
    });
  });
});

const transactionsMock: Transactions = [
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
  {
    categoryCode: '#d51271',
    dates: {
      valueDate: '2020-09-19',
    },
    transaction: {
      amountCurrency: {
        amount: 84.64,
        currencyCode: 'EUR',
      },
      type: 'Card Payment',
      creditDebitIndicator: 'DBIT',
    },
    merchant: {
      name: 'Texaco',
      accountNumber: 'SI64397745065188826',
    },
  },
];
