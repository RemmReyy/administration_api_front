import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Salesman {
  sid?: number;
  firstname: string;
  lastname: string;
}

export interface SocialPerformanceRecord {
  sid: number;
  year: number;
  targetValue?: number;
  actualValue?: number;
  bonus?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // ===== Salesman Methods =====
  getAllSalesmen(): Observable<Salesman[]> {
    return this.http.get<Salesman[]>(`${this.baseUrl}/salesman`,
      { headers: this.getHeaders() });
  }

  getSalesman(sid: number): Observable<Salesman> {
    return this.http.get<Salesman>(`${this.baseUrl}/salesman/${sid}`,
      { headers: this.getHeaders() });
  }

  createSalesman(salesman: Salesman): Observable<Salesman> {
    return this.http.post<Salesman>(`${this.baseUrl}/salesman`, salesman,
      { headers: this.getHeaders() });
  }

  updateSalesman(sid: number, salesman: Salesman): Observable<Salesman> {
    return this.http.put<Salesman>(`${this.baseUrl}/salesman/${sid}`, salesman,
      { headers: this.getHeaders() });
  }

  deleteSalesman(sid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/salesman/${sid}`,
      { headers: this.getHeaders() });
  }

  // ===== Social Performance Methods =====
  getSalesmanRecords(sid: number): Observable<SocialPerformanceRecord[]> {
    return this.http.get<SocialPerformanceRecord[]>(
      `${this.baseUrl}/salesman/${sid}/records`,
      { headers: this.getHeaders() }
    );
  }

  createRecord(sid: number, record: SocialPerformanceRecord): Observable<SocialPerformanceRecord> {
    return this.http.post<SocialPerformanceRecord>(
      `${this.baseUrl}/salesman/${sid}/records`,
      record,
      { headers: this.getHeaders() }
    );
  }

  getRecordsByYear(year: number): Observable<SocialPerformanceRecord[]> {
    return this.http.get<SocialPerformanceRecord[]>(
      `${this.baseUrl}/record/${year}`,
      { headers: this.getHeaders() }
    );
  }

  updateRecord(sid: number, year: number, record: SocialPerformanceRecord): Observable<SocialPerformanceRecord> {
    return this.http.put<SocialPerformanceRecord>(
      `${this.baseUrl}/record/${sid}/${year}`,
      record,
      { headers: this.getHeaders() }
    );
  }

  deleteRecord(sid: number, year: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/record/${sid}/${year}`,
      { headers: this.getHeaders() });
  }
}
