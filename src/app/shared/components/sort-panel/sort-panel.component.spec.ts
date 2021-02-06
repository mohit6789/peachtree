import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortOption } from 'src/app/shared/components/sort-panel/sort-panel.interfaces';
import { DOMHelper } from 'src/testing/dom-helper';

import { SortPanelComponent } from './sort-panel.component';

describe('SortPanelComponent', () => {
  let component: SortPanelComponent;
  let fixture: ComponentFixture<SortPanelComponent>;
  let dh: DOMHelper<SortPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortPanelComponent);
    dh = new DOMHelper(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default label when label is not passing.', () => {
    expect(dh.singleText('label')).toBe(component.defaultLabel);
  });

  it('should show two buttons.', () => {
    component.options = mockOptions;
    fixture.detectChanges();
    expect(dh.count('button')).toBe(2);
  });

  it('should init the orderBy with default value', () => {
    component.options = mockOptions;
    component.ngOnInit();
    expect(component.sortBy).toBe(mockOptions[0].key);
  });

  describe('Sort Panel Buttons', () => {
    beforeEach(() => {
      component.options = mockOptions;
      component.sortBy = 'DATE';
      component.sortOrder = 'DESC';
      fixture.detectChanges();
    });

    it('should change sort order when click on DATE button.', () => {
      expect(component.sortBy).toBe('DATE');
      const button: HTMLButtonElement = dh.findElementByText('button', 'DATE')
        .nativeElement;
      button.click();
      expect(component.sortOrder).toBe('ASC');
      button.click();
      expect(component.sortOrder).toBe('DESC');
    });

    it('should change sort type when click on AMOUNT button and sort order should not changed.', () => {
      expect(component.sortBy).toBe('DATE');
      const button: HTMLButtonElement = dh.findElementByText('button', 'AMOUNT')
        .nativeElement;
      button.click();
      expect(component.sortBy).toBe('AMOUNT');
      expect(component.sortOrder).toBe('DESC');
    });

    it('should change sort type when click on AMOUNT button and sort order should changed on second click.', () => {
      expect(component.sortBy).toBe('DATE');
      const button: HTMLButtonElement = dh.findElementByText('button', 'AMOUNT')
        .nativeElement;
      button.click();
      button.click();
      expect(component.sortOrder).toBe('ASC');
    });
  });
});

const mockOptions: SortOption[] = [
  {
    key: 'DATE',
    label: 'DATE',
  },
  {
    key: 'AMOUNT',
    label: 'AMOUNT',
  },
];
