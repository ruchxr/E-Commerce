import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsStoreItems } from '../Services/product/products.storeItems';
import { Product } from '../types/products.type';
import { ProductService } from '../Services/product/product.service';
import { Subscription } from 'rxjs';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../Services/cart/cart.storeItems';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css'
})
export class DetailProductsComponent implements OnInit, OnDestroy{
  product: Product[] = [];
  singleProduct?: Product;
  subscription: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;

  constructor(
    private router: ActivatedRoute, 
    private productService: ProductService,
    private cartStore: CartStoreItem){
  }

  ngOnInit(): void {
    var category_id = Number(this.router.snapshot.params['id']);

    this.subscription.add(
    this.productService.getProduct(category_id).subscribe(p => {
      this.product = p;
      this.singleProduct = this.product[0];
    }));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  addToCart(product: Product | undefined){
    if(product){
      this.cartStore.addProducts(product)
    }
  }
}
