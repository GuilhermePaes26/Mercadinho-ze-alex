import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  products: any[] = [];
  cartWithDetails: any[] = [];
  calculatedAmount: number = 0;
  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartWithDetails = this.cartService.getCartItemsWithDetails();
    });
  }
  get totalPrice(): number {
    return this.cartWithDetails.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  calculatedChange(): number {
    return (
      this.calculatedAmount -
      this.cartWithDetails
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    );
  }
  finalizePurchase(): void {
    const cartItems = this.cartService.getCartItems();
    this.apiService.finalizePurchase(cartItems).subscribe((response: any) => {
      console.log(response);
      alert(`${response}`);
      this.cartService.clearCart();
    });
  }
}
