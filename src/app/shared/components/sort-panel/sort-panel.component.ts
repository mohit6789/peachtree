import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  SortOption,
  SortOrder,
  SortPreferences,
} from 'src/app/shared/components/sort-panel/sort-panel.interfaces';

@Component({
  selector: 'app-sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.scss'],
})
export class SortPanelComponent implements OnInit {
  readonly defaultLabel: string = 'Sort By';
  @Input() label: string = 'Sort By';
  @Input() options: Array<SortOption> = [];

  @Input()
  sortOrder: SortOrder = 'ASC';

  @Input()
  sortBy: any;

  @Output() changed: EventEmitter<SortPreferences> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (!this.sortBy && this.options && this.options.length) {
      this.sortBy = this.options[0].key;
    }
  }

  onClick(option: SortOption) {
    if (option.key === this.sortBy) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = option.key;
    }

    this.changed &&
      this.changed.emit({
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });
  }
}
