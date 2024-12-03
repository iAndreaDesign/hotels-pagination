import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'av-hotel-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-search.component.html'
})
export class HotelSearchComponent {
  private readonly fbb: FormBuilder = inject(FormBuilder);
  
  @Output() search = new EventEmitter<void>();
  @Input() isFiltersVisible: boolean = false;
  @Output() toggleFilters = new EventEmitter<void>();
  @Input() searchForm!: FormGroup;

  onSearchSubmit() {
    if (this.searchForm.valid) {
      this.search.emit();
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  showFilters() {
    this.toggleFilters.emit();
  }
}
