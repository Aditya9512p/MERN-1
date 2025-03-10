import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Generic CRUD operations
  getAll<T>(collection: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${collection}`);
  }

  getById<T>(collection: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${collection}/${id}`);
  }

  create<T>(collection: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${collection}`, data);
  }

  update<T>(collection: string, id: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${collection}/${id}`, data);
  }

  delete(collection: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${collection}/${id}`);
  }
} 