import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MakeTransactionPreviewComponent } from 'src/app/pages/transactions/components/make-transaction-preview/make-transaction-preview.component';
import { TransactionService } from 'src/app/pages/transactions/transaction.service';
import { DOMHelper } from 'src/testing/dom-helper';

import { MakeTransactionComponent } from './make-transaction.component';

describe('MakeTransactionComponent', () => {
  let component: MakeTransactionComponent;
  let fixture: ComponentFixture<MakeTransactionComponent>;
  let transactionServiceMock: any;
  let dh: DOMHelper<MakeTransactionComponent>;

  beforeEach(async () => {
    transactionServiceMock = jasmine.createSpyObj('TransactionService', [
      'search',
      'makeTransaction',
      'accountBalance$',
    ]);
    transactionServiceMock.accountBalance$ = of(1000);

    await TestBed.configureTestingModule({
      declarations: [MakeTransactionComponent, MakeTransactionPreviewComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransactionComponent);
    dh = new DOMHelper(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show SUBMIT button', () => {
    const submit = dh.findElementByText('button', 'SUBMIT');
    expect(submit).toBeTruthy();
  });

  describe('Submit form', () => {
    it('should show form errors when submit form without data.', async () => {
      const button = dh.findOne('button').nativeElement;
      button.click();
      fixture.detectChanges();
      const formErrors = dh.findAll('.form-error');
      expect(formErrors.length).toBe(2);
    });

    it('should show overdraft limit message when transaction amount exceeds overdraft limit.', async () => {
      submitFormWithData(component, dh, 'Texaco', 1700);
      fixture.detectChanges();
      const error = dh.findElementByText(
        'p.form-error',
        'Overdraft limit exceeds.'
      );
      expect(error).toBeTruthy();
    });

    it('should submit form with valid data.', async () => {
      submitFormWithData(component, dh, 'Texaco', 10);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.showPreview).toBe(true);
    });

    it('should show preview screen when submit form with valid data.', async () => {
      submitFormWithData(component, dh, 'Texaco', 10);
      fixture.detectChanges();
      const previewElement: MakeTransactionPreviewComponent = getPreviewComponent(
        fixture
      );
      expect(previewElement).toBeTruthy();
    });

    it('should transfer the amount and show success message.', () => {
      submitFormWithData(component, dh, 'Texaco', 10);
      transactionServiceMock.makeTransaction.and.returnValue({});
      fixture.detectChanges();

      const previewElement: MakeTransactionPreviewComponent = getPreviewComponent(
        fixture
      );

      previewElement.transfer.emit();
      fixture.detectChanges();
      expect(transactionServiceMock.makeTransaction).toHaveBeenCalled();
      const error = dh.findElementByText(
        'p.form-success',
        'Your tranaction has successfully completed.'
      );
      expect(error).toBeTruthy();
    });

    it('should reset the form when user transfer the amount.', () => {
      submitFormWithData(component, dh, 'Texaco', 10);
      transactionServiceMock.makeTransaction.and.returnValue({ data: 'DUMMY' });
      fixture.detectChanges();
      spyOn(component.makeTransactionFormGroup, 'reset');

      const previewElement: MakeTransactionPreviewComponent = getPreviewComponent(
        fixture
      );
      previewElement.transfer.emit();
      expect(transactionServiceMock.makeTransaction).toHaveBeenCalled();

      expect(component.makeTransactionFormGroup.reset).toHaveBeenCalled();
      expect(component.makeTransactionFormGroup.untouched).toBeTrue();
    });

    it('should show the make transaction form when user cancel the transaction.', () => {
      submitFormWithData(component, dh, 'Texaco', 10);
      fixture.detectChanges();

      const previewElement: MakeTransactionPreviewComponent = getPreviewComponent(
        fixture
      );
      previewElement.cancel.emit();
      fixture.detectChanges();
      expect(component.showPreview).toBeFalse();
    });
  });
});

function getPreviewComponent(
  fixture: ComponentFixture<MakeTransactionComponent>
) {
  const debugElement = fixture.debugElement;
  const previewElement: MakeTransactionPreviewComponent = debugElement.query(
    By.directive(MakeTransactionPreviewComponent)
  )?.componentInstance;
  return previewElement;
}

function submitFormWithData(
  component: MakeTransactionComponent,
  dh: DOMHelper<MakeTransactionComponent>,
  to: string,
  amount: number
) {
  component.toAccount?.setValue(to);
  component.amount?.setValue(amount);
  const button = dh.findOne('button').nativeElement;
  button.click();
}
