import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchboxComponent,
      multi: true,
    },
  ],
})
export class SearchboxComponent implements OnInit, ControlValueAccessor {
  private _searchText: string = '';

  onChange: any = (val: string) => {};
  onTouched: any = () => {};

  @Input()
  get value() {
    return this._searchText;
  }

  set value(val: string) {
    this._searchText = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() {}

  ngOnInit(): void {}

  clear() {
    this.value = '';
  }

  writeValue(val: string): void {
    val && (this.value = val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
