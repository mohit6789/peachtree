import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOMHelper } from 'src/testing/dom-helper';

import { MakeTransactionPreviewComponent } from './make-transaction-preview.component';

describe('MakeTransactionPreviewComponent', () => {
  let component: MakeTransactionPreviewComponent;
  let fixture: ComponentFixture<MakeTransactionPreviewComponent>;
  let dh: DOMHelper<MakeTransactionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeTransactionPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransactionPreviewComponent);
    dh = new DOMHelper(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present two buttons with text "Cancel" and "Transfer" ', () => {
    let cancelBtn = dh.findElementByText('button', 'Cancel');
    let transferBtn = dh.findElementByText('button', 'Transfer');
    expect(cancelBtn).toBeTruthy();
    expect(transferBtn).toBeTruthy();
  });

  it('should emit cancel event on cancel button pressed.', () => {
    spyOn(component.cancel, 'emit');
    let btn = dh.findElementByText('button', 'Cancel');
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit transfer event on Transfer button pressed.', () => {
    spyOn(component.transfer, 'emit');
    let btn = dh.findElementByText('button', 'Transfer');
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.transfer.emit).toHaveBeenCalled();
  });
});
