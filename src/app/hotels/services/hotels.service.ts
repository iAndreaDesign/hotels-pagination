import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly bdUrl: string = 'http://localhost:3000/hotels';
  private httpCLient: HttpClient = inject(HttpClient);

  getHotels(): Observable<Hotel[]> {
    return this.httpCLient.get<Hotel[]>(`${this.bdUrl}`);
  }

  getHotelsfilterByName(name: string): Observable<Hotel[]> {
    return this.getHotels().pipe(
      map((hotels) => hotels.filter((hotel) => {
          return hotel.name.toLowerCase().includes(name.toLowerCase())
        })
    ))
  }

  getFilteredHotels(name: string = '', categories: number[] = [], minRating: number = 0, maxPrice: number = 10000): Observable<Hotel[]> {
    return this.getHotels().pipe(
      map((hotels) => hotels.filter((hotel) => {
        return (
          (name === '' || hotel.name.toLowerCase().includes(name.toLowerCase())) &&
          (categories.some(star => hotel.stars === star)) &&
          (hotel.rate >= minRating) &&
          (hotel.price <= maxPrice)
        );
      }))
    );
  }
}
