import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

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
  Excluir(ProductId: number): void {
    console.log(ProductId);
    this.apiService.ExcluirProducts(ProductId).subscribe((data: any) => {
      this.loadProducts();
    });
  }
}
