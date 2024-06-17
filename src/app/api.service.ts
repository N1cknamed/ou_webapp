import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'localhost:8000/api/weather';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.url)
  }

  getWindData(): Observable<any> {
    let urlWND = this.url + '/wind';
    return this.http.get(urlWND)
  }

  getPrecipitationData(): Observable<any> {
    let urlPRCP = this.url + '/rain';
    return this.http.get(urlPRCP)
  }
}
