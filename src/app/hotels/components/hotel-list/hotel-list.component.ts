import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hotel } from '../../models/hotel.model';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';

@Component({
  selector: 'av-hotel-list',
  standalone: true,
  imports: [HotelCardComponent],
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent {
  @Input() hotels: Hotel[] = [];
  @Input() currentPage: number = 1;
  @Input() totalHotels: number = 0;
  @Input() pageSize: number = 16;
  @Input() pages: number = 0;
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();


}
