import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartWithDetails: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  cartItems$ = this.cartSubject.asObservable();

  addToCart(item: any): void {
    this.cartItems.push(item);
    this.cartSubject.next(this.cartItems);
  }

  addToCartWithDetails(item: any): void {
    this.cartWithDetails.push(item);
    console.log(this.cartWithDetails);
    this.cartSubject.next(this.cartWithDetails);
  }

  getCartItemsWithDetails(): any[] {
    return this.cartWithDetails;
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    this.cartWithDetails = [];
    this.cartSubject.next(this.cartWithDetails);
  }
}
