import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productId: number | null = null;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? +id : null;

    if (this.productId) {
      this.loadProductForEditing(this.productId);
    }
  }
  loadProductForEditing(id: number): void {
    this.apiService.getProductsById(id).subscribe((product) => {
      this.product = product;
    });
  }
  saveProduct(): void {
    if (this.productId) {
      this.apiService.editProduct(this.product).subscribe(() => {});
      alert('Produto atualizado com sucesso!');
      this.router.navigate(['/produtos']);
    } else {
      this.apiService.addProduct(this.product).subscribe(() => {});
      alert('Produto cadastrado com sucesso!');
      this.router.navigate(['/produtos']);
    }
  }
}
