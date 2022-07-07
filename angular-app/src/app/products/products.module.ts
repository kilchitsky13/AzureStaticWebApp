import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [CommonModule, HttpClientModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, ProductsComponent],
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  providers: [ProductService]
})
export class ProductsModule {}
