import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Product } from '../core';

@Component({
  selector: 'app-product-detail',
  templateUrl: `./product-detail.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnChanges {
  @Input() product: Product;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Product>();

  addMode = false;
  editingProduct: Product;

  ngOnChanges(changes: SimpleChanges) {
    if (this.product && this.product.id) {
      this.editingProduct = { ...this.product };
      this.addMode = false;
    } else {
      this.editingProduct = {
        id: undefined,
        name: '',
        description: '',
        quantity: 1,
      };
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveProduct() {
    this.save.emit(this.editingProduct);
    this.clear();
  }
}
