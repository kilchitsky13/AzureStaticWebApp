import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: `./products.component.html`,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  selected: Product;
  products$: Observable<Product[]>;
  message = '?';
  productToDelete: Product;
  showModal = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.getAll();
  }

  add(product: Product) {
    this.productService.add(product).subscribe(value => console.log(value));
  }

  askToDelete(product: Product) {
    this.productToDelete = product;
    this.showModal = true;
    if (this.productToDelete.name) {
      this.message = `Would you like to delete ${this.productToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteProduct() {
    this.closeModal();
    if (this.productToDelete) {
      this.productService
        .delete(this.productToDelete.id)
        .subscribe(() => (this.productToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getProducts() {
    this.products$ = this.productService.getAll();
    this.clear();
  }

  save(product: Product) {
    if (this.selected && this.selected.name) {
      this.update(product);
    } else {
      this.add(product);
    }
  }

  select(product: Product) {
    this.selected = product;
  }

  update(product: Product) {
    this.productService.update(product).subscribe();
  }
}
