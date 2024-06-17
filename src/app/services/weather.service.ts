import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    const mockData = [
      { lat: 52.5200, lng: 13.4050, rainfall: 50, temperature: 10 }, // Berlin
      { lat: 48.1351, lng: 11.5820, rainfall: 45, temperature: 12 }, // Munich
      { lat: 50.9375, lng: 6.9603, rainfall: 78, temperature: 11 },  // Cologne
      { lat: 53.5511, lng: 9.9937, rainfall: 55, temperature: 8 },   // Hamburg
      { lat: 50.1109, lng: 8.6821, rainfall: 40, temperature: 10 },  // Frankfurt
      { lat: 51.2277, lng: 6.7735, rainfall: 62, temperature: 9 },   // Dusseldorf
      { lat: 51.0504, lng: 13.7373, rainfall: 42, temperature: 10 }, // Dresden
      { lat: 49.4875, lng: 8.4660, rainfall: 74, temperature: 11 },  // Mannheim
      { lat: 48.7758, lng: 9.1829, rainfall: 47, temperature: 10 },  // Stuttgart
      { lat: 52.3759, lng: 9.7320, rainfall: 36, temperature: 10 },  // Hanover
      { lat: 51.3397, lng: 12.3731, rainfall: 50, temperature: 10 }, // Leipzig
      { lat: 49.4521, lng: 11.0767, rainfall: 48, temperature: 9 },  // Nuremberg
      { lat: 50.9787, lng: 11.0328, rainfall: 62, temperature: 11 }, // Erfurt
      { lat: 51.5125, lng: 7.4653, rainfall: 39, temperature: 9 },   // Dortmund
      { lat: 54.3233, lng: 10.1228, rainfall: 54, temperature: 8 },  // Kiel
      { lat: 49.0069, lng: 8.4037, rainfall: 44, temperature: 11 },  // Karlsruhe
      { lat: 51.4456, lng: 7.0133, rainfall: 51, temperature: 9 },   // Essen
      { lat: 48.4011, lng: 9.9876, rainfall: 35, temperature: 10 },  // Ulm
      { lat: 49.8988, lng: 10.9028, rainfall: 47, temperature: 10 }, // Bamberg
      { lat: 50.0833, lng: 8.2416, rainfall: 43, temperature: 10 },  // Wiesbaden
      // tijdelijke data tot api key is geimplementeerd
    ];
    return of(mockData);
  }
}
