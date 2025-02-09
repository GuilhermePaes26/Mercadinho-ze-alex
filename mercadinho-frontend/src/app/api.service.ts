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

  getProductsById(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/produtos/${productId}`);
  }

  ExcluirProducts(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/produtos/${productId}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/produtos`, product);
  }

  editProduct(product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/produtos/${product.id}`, product);
  }

  finalizePurchase(
    items: { productId: number; quantity: number }[]
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/carrinho/adicionar`, items, {
      responseType: 'text',
    });
  }
}
