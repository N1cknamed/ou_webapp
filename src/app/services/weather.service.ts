import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private apiService: ApiService) {}

  getWeatherData(): Observable<any> {
    return this.apiService.getRainData();
  }
}
