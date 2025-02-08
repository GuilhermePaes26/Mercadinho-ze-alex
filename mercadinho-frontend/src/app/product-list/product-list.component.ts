import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  filteredProducts() {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addToCart(product: any, quantity: number): void {
    const item = {
      productId: Number(product.id),
      quantity: Number(quantity),
    };
    const itemDetails = {
      name: product.name,
      price: product.price,
      quantity,
    };
    this.cartService.addToCart(item);
    this.cartService.addToCartWithDetails(itemDetails);
  }
}
