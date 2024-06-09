import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'apiurl'; // apiurl must change to api url
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.url)
  }

  getWindData(): Observable<any> {
    urlWND = this.url + '/WND';
    return this.http.get(urlWND)
  }

  getPrecipitationData(): Observable<any> {
    urlPRCP = this.url + '/PRCP';
    return this.http.get(urlPRCP)
  }
}
