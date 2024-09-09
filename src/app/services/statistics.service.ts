import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:3000/producers/statistics';
  private statistics$: Observable<any> | null = null; // Cache para os dados

  constructor(private http: HttpClient) {}

  // Método para fazer a requisição e armazenar em cache
  getStatistics(): Observable<any> {
    if (!this.statistics$) {
      // Faz a requisição e armazena o resultado usando shareReplay para cache
      this.statistics$ = this.http.get<any>(this.apiUrl).pipe(
        tap(data => console.log('Data fetched: ', data)), // Apenas para debugar
        shareReplay(1) // Mantém o resultado em cache
      );
    }
    return this.statistics$;
  }

  createProducer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateProducer(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch(url, data);
  }
}
