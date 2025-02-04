import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  products: any[] = [];
  cartWithDetails: any[] = [];

  constructor(private cartService: CartService) {}

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
}
