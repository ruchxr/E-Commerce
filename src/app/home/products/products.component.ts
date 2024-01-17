import { AfterContentChecked, AfterViewChecked, Component } from '@angular/core';
import { ProductService } from '../Services/product/product.service';
import { Product } from '../types/products.type';
import { ProductsStoreItems } from '../Services/product/products.storeItems';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../Services/cart/cart.storeItems';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService]
})
export class ProductsComponent implements AfterContentChecked{
  products: Product[] = [];
  productsPresent: boolean = true;
  faShoppingCart = faShoppingCart;

  constructor(private productStore: ProductsStoreItems,
    private cartStore: CartStoreItem){
    this.productStore.products$
    .subscribe((products) => {
      this.products = products
    })
  }

  ngAfterContentChecked(): void {
      if(this.products.length === 0){
        this.productsPresent = false;
      }
      else{
        this.productsPresent = true;
      }
  }

  addToCart(product: Product){
    this.cartStore.addProducts(product);
    console.log(this.cartStore.cart$)
    console.log(this.cartStore.totalProducts)
  }
}
