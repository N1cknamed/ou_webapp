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
      { lat: 52.5200, lng: 13.4050, rainfall: 50, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Berlin
      { lat: 48.1351, lng: 11.5820, rainfall: 45, temperature: 12, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Munich
      { lat: 50.9375, lng: 6.9603, rainfall: 78, temperature: 11, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Cologne
      { lat: 53.5511, lng: 9.9937, rainfall: 55, temperature: 8, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },   // Hamburg
      { lat: 50.1109, lng: 8.6821, rainfall: 40, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Frankfurt
      { lat: 51.2277, lng: 6.7735, rainfall: 62, temperature: 9, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },   // Dusseldorf
      { lat: 51.0504, lng: 13.7373, rainfall: 42, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Dresden
      { lat: 49.4875, lng: 8.4660, rainfall: 74, temperature: 11, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Mannheim
      { lat: 48.7758, lng: 9.1829, rainfall: 47, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Stuttgart
      { lat: 52.3759, lng: 9.7320, rainfall: 36, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Hanover
      { lat: 51.3397, lng: 12.3731, rainfall: 50, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Leipzig
      { lat: 49.4521, lng: 11.0767, rainfall: 48, temperature: 9, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Nuremberg
      { lat: 50.9787, lng: 11.0328, rainfall: 62, temperature: 11, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Erfurt
      { lat: 51.5125, lng: 7.4653, rainfall: 39, temperature: 9, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },   // Dortmund
      { lat: 54.3233, lng: 10.1228, rainfall: 54, temperature: 8, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Kiel
      { lat: 49.0069, lng: 8.4037, rainfall: 44, temperature: 11, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Karlsruhe
      { lat: 51.4456, lng: 7.0133, rainfall: 51, temperature: 9, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },   // Essen
      { lat: 48.4011, lng: 9.9876, rainfall: 35, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Ulm
      { lat: 49.8988, lng: 10.9028, rainfall: 47, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Bamberg
      { lat: 50.0833, lng: 8.2416, rainfall: 43, temperature: 10, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Wiesbaden
      // Japan locations
      { lat: 35.6895, lng: 139.6917, rainfall: 67, temperature: 16, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Tokyo
      { lat: 34.6937, lng: 135.5023, rainfall: 75, temperature: 14, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Osaka
      { lat: 35.0116, lng: 135.7681, rainfall: 72, temperature: 15, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Kyoto
      { lat: 43.0621, lng: 141.3544, rainfall: 60, temperature: 7, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Sapporo
      { lat: 26.2124, lng: 127.6794, rainfall: 90, temperature: 23, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Okinawa
      { lat: 33.5897, lng: 130.4019, rainfall: 85, temperature: 13, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Fukuoka
      { lat: 35.6894, lng: 139.692, rainfall: 68, temperature: 17, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Shinjuku, Tokyo
      { lat: 34.6913, lng: 135.183, rainfall: 77, temperature: 14, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Kobe
      { lat: 35.4437, lng: 139.638, rainfall: 65, temperature: 16, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) },  // Yokohama
      { lat: 38.2682, lng: 140.8694, rainfall: 70, temperature: 12, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Sendai
      { lat: 36.2048, lng: 138.2529, rainfall: 73, temperature: 15, date: this.randomDate(new Date(2024, 5, 19), new Date(2024, 5, 25)) }, // Nagano
    ];
    return of(mockData);
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}