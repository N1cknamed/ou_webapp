import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://localhost:8000/api';
  constructor(private http: HttpClient) { }

  // New login method
  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.url}/login`;
    return this.http.post(loginUrl, { username, password });
  }

  // Example method to include the token in the request header
  getData(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/weather`, { headers });
  }

  getWindData(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/weather/wind`, { headers });
  }

  getRainData(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/weather/rain`, { headers });
  }

  // Helper method to create HttpHeaders with Authorization token
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
}