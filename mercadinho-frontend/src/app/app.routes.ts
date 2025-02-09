import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'produtos/novo', component: ProductFormComponent },
  { path: 'produtos/edit/:id', component: ProductFormComponent },
];
