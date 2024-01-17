import { Component } from '@angular/core';
import { ProductsStoreItems } from '../Services/product/products.storeItems';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.css'
})
export class ProductsGalleryComponent {
  constructor(private productStoreItems: ProductsStoreItems){}

  handleClick(subCategoryId: number){
    this.productStoreItems.loadProducts('subCategoryId=' + subCategoryId)
  }
}
