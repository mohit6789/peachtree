import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchboxComponent } from './searchbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchboxComponent],
  imports: [CommonModule, FormsModule],
  exports: [SearchboxComponent],
})
export class SearchboxModule {}
