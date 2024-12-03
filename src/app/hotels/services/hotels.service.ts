import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, exhaustMap, map } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private readonly bdUrl: string = 'http://localhost:3000/hotels';
  private readonly httpClient: HttpClient = inject(HttpClient);
  getHotels$ = new Subject<Hotel[]>();

  constructor() {
    this.getHotels$.pipe(
      takeUntilDestroyed(),
      exhaustMap(() => this.httpClient.get<Hotel[]>(`${this.bdUrl}`)
      )
    );
  }


  getHotelsfilterByName(name: string): Observable<Hotel[]> {
    return this.getHotels$.pipe(
      takeUntilDestroyed(),
      exhaustMap(()=> 
        this.getHotels$.pipe(
          map((hotels) => hotels.filter((hotel) => {
              return hotel.name.toLowerCase().includes(name.toLowerCase())
            })
        ))
      )
    )
  }

  getFilteredHotels(name: string = '', categories: number[] = [], minRating: number = 0, maxPrice: number = 10000): Observable<Hotel[]> {
    return this.getHotels$.pipe(
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
