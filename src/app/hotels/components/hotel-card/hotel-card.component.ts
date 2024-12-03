import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'av-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: [],
  standalone: true
})
export class HotelCardComponent {
  @Input() public hotel!: Hotel;
}
