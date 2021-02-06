import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DOMHelper } from 'src/testing/dom-helper';

import { SearchboxComponent } from './searchbox.component';

describe('SearchboxComponent', () => {
  let component: SearchboxComponent;
  let fixture: ComponentFixture<SearchboxComponent>;
  let dh: DOMHelper<SearchboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchboxComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchboxComponent);
    dh = new DOMHelper(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change textbox valud and call onChanged and onTouched on value change.', () => {
    spyOn(component, 'onChange');
    spyOn(component, 'onTouched');
    const textbox = dh.findOne('input');
    component.value = 'abc';
    fixture.detectChanges();

    expect(component.onChange).toHaveBeenCalled();
    expect(component.onTouched).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(textbox.nativeElement.value).toBe('abc');
    });
  });

  it('should not show clear button if textbox is empty', () => {
    const clear = dh.findOne('.searchbox button');
    expect(clear).toBeFalsy();
  });

  it('should show clear button and onclick search field should be clear.', async () => {
    component.value = 'abc';
    fixture.detectChanges();
    await fixture.whenStable();
    const clear = dh.findOne('.searchbox button');
    expect(clear).toBeTruthy();
    clear.nativeElement.click();
    fixture.detectChanges();
    const textbox = dh.findOne('input');
    await fixture.whenStable();
    expect(textbox.nativeElement.value).toBeFalse;
  });
});
