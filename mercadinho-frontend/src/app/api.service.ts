import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produtos`);
  }

  finalizePurchase(
    items: { productId: number; quantity: number }[]
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/carrinho/adicionar`, items, {
      responseType: 'text',
    });
  }
}
