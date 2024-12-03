import { Component, inject, OnInit, signal } from '@angular/core';
import { Hotel } from '../../models/hotel.model';
import { HotelsService } from '../../services/hotels.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelListComponent } from '../../components/hotel-list/hotel-list.component';
import { HotelSearchComponent } from '../../components/hotel-search/hotel-search.component';

@Component({
  selector: 'av-hotels-page',
  templateUrl: './hotels-page.component.html',
  styles: [],
  standalone: true,
  imports: [ HotelListComponent, HotelSearchComponent ]
})
export class HotelsPageComponent implements OnInit {
  private readonly hotelsService: HotelsService = inject(HotelsService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  public hotels = signal<Hotel[]>([]);
  public isFiltersVisible: boolean = false;
  public searchForm: FormGroup;
  public totalHotels = signal<number>(0);
  public currentPage = signal<number>(1);
  public pageSize = signal<number>(16);

  constructor() {
    this.searchForm = this.fb.group({
      hotelName: '',
      stars: this.fb.array([this.fb.control(true), this.fb.control(true), this.fb.control(true)]),
      valoration: 0,
      price: 10000,
    });
  }

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelsService.getHotels().subscribe({
      next: (data: Hotel[]) => this.applyPagination(data),
      error: (error) => console.error('Error en la carga de hoteles:', error),
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    
    const hotelName = this.searchForm.get('hotelName')?.value;
    const stars = this.getSelectedStars();
    const valoration = this.searchForm.get('valoration')?.value;
    const price = this.searchForm.get('price')?.value;

    if (!this.isFiltersVisible && hotelName) {
      this.hotelsService.getHotelsfilterByName(hotelName)
        .subscribe({
          next: (data: Hotel[]) => this.applyPagination(data),
          error: (error: any) => console.error('Error en la búsqueda:', error)
        });
    } else {
      this.hotelsService.getFilteredHotels(hotelName, stars, valoration, price)
        .subscribe({
          next: (data: Hotel[]) => this.applyPagination(data),   
          error: (error: any) => console.error('Error en la búsqueda:', error)
        });
    }
  }

  getSelectedStars(): number[] {
    const stars = this.searchForm.get('stars')?.value;
    const selectedStars: number[] = [];
    if (stars[0]) selectedStars.push(3);
    if (stars[1]) selectedStars.push(4);
    if (stars[2]) selectedStars.push(5);
    return selectedStars;
  }

  toggleFilters(): void  {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

  nextPage(): void {
    if ((this.currentPage() * this.pageSize()) < this.totalHotels()) {
      this.currentPage.update(currentValue => currentValue++);
      this.loadHotels();
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(currentValue => currentValue--);
      this.loadHotels();
    }
  }

  private applyPagination(data: Hotel[]): void {
    this.totalHotels.set(data.length);
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    this.hotels.set(data.slice(start, end));
  }
}
