import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../core';

@Component({
  selector: 'app-product-list',
  templateUrl: `./product-list.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products: Product[];
  @Output() deleted = new EventEmitter<Product>();
  @Output() selected = new EventEmitter<Product>();

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  selectProduct(product: Product) {
    this.selected.emit(product);
  }

  deleteProduct(product: Product) {
    this.deleted.emit(product);
  }
}
