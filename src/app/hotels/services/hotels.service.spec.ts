import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelsService } from './hotels.service';
import { Hotel } from '../models/hotel.model';

describe('HotelsService', () => {
  let service: HotelsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelsService]
    });

    service = TestBed.inject(HotelsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHotels', () => {
    it('should fetch a list of hotels', () => {
      const mockHotels: Hotel[] = [
        { id: '1', name: 'Hotel A', stars: 4, rate: 8.5, price: 100, image: '', address: 'Alicante' },
        { id: '2', name: 'Hotel B', stars: 3, rate: 7.0, price: 80, image: '', address: 'Elche' }
      ];

      service.getHotels().subscribe((hotels) => {
        expect(hotels.length).toBe(2);
        expect(hotels).toEqual(mockHotels);
      });

      const req = httpMock.expectOne('http://localhost:3000/hotels');
      expect(req.request.method).toBe('GET');
      req.flush(mockHotels);
    });
  });

  describe('getHotelsfilterByName', () => {
    it('should filter hotels by name', () => {
      const mockHotels: Hotel[] = [
        { id: '1', name: 'Hotel A', stars: 4, rate: 8.5, price: 100, image: '', address: 'Alicante' },
        { id: '2', name: 'Hotel B', stars: 3, rate: 7.0, price: 80, image: '', address: 'Elche' }
      ];

      service.getHotelsfilterByName('Hotel A').subscribe((hotels) => {
        expect(hotels.length).toBe(1);
        expect(hotels[0].name).toBe('Hotel A');
      });

      const req = httpMock.expectOne('http://localhost:3000/hotels');
      req.flush(mockHotels);
    });
  });

  describe('getFilteredHotels', () => {
    it('should filter hotels by name, stars, rating, and price', () => {
      const mockHotels: Hotel[] = [
        { id: '1', name: 'Hotel A', stars: 4, rate: 8.5, price: 100, image: '', address: 'Alicante' },
        { id: '2', name: 'Hotel B', stars: 3, rate: 7.0, price: 80, image: '', address: 'Elche' },
        { id: '3', name: 'Hotel C', stars: 5, rate: 9.0, price: 200, image: '', address: 'Murcia' }
      ];

      service.getFilteredHotels('Hotel', [4, 5], 8, 150).subscribe((hotels) => {
        expect(hotels.length).toBe(1);
        expect(hotels[0].name).toBe('Hotel A');
      });

      const req = httpMock.expectOne('http://localhost:3000/hotels');
      req.flush(mockHotels);
    });
  });
});
