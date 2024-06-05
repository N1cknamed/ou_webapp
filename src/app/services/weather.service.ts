import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    const mockData = [
      { lat: 48.8566, lng: 2.3522, rainfall: 20, temperature: 12 },
      { lat: 51.5074, lng: -0.1278, rainfall: 30, temperature: 10 },
      // tijdelijke data tot api key is geimplementeerd
    ];
    return of(mockData);
  }
}
