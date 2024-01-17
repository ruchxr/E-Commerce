import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Category } from '../types/category.type';
import { Subscription } from 'rxjs';
import { CategoriesStoreItem } from '../Services/category/categories.storeItems';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-catnavigation',
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.css'
})
export class CatnavigationComponent implements OnDestroy{

  @Output() categoryClicked: EventEmitter<number> = new EventEmitter<number>();
  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();

  displayOptions: boolean = true;

  constructor(private categoryStore: CategoriesStoreItem, private router: Router){
    this.subscriptions.add(this.categoryStore.categories$
    .subscribe(categories => {
      this.categories = categories.filter(
        category => 
          category.parent_category_id === null
      )
    }))

    router.events
    .pipe(filter((event: any) => 
      event instanceof NavigationEnd
    ))
    .subscribe(
      event => {
        this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true : false
      }
    )
  }

  onCategoryClicked(category: Category){
    this.categoryClicked.emit(category.id);
    console.log(category.id)
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
