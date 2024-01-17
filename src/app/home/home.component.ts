import { Component } from '@angular/core';
import { CategoriesStoreItem } from './Services/category/categories.storeItems';
import { ProductsStoreItems } from './Services/product/products.storeItems';
import { SearchKeyword } from './types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private categoryStoreItems: CategoriesStoreItem, 
    private productStoreItems: ProductsStoreItems,
    private router: Router){
    this.categoryStoreItems.loadCategories();
    this.productStoreItems.loadProducts();

    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      if((event as NavigationEnd).url === '/home'){
        router.navigate(['/home/products'])
      }
    })
  }

  handleCategoryClick(mainCategoryId: number){
    this.productStoreItems.loadProducts('mainCategoryId=' + mainCategoryId)
    console.log('mainCategoryId=' + mainCategoryId)
  }

  handleSearch(searchKeyword: SearchKeyword){
    this.productStoreItems.loadProducts('mainCategoryId=' + searchKeyword.category_id + '&keyword=' + searchKeyword.keyword)
    console.log(searchKeyword)
  }
}
