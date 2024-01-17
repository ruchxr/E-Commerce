import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Category } from '../types/category.type';
import { CategoryService } from '../Services/category/category.service';
import { CategoriesStoreItem } from '../Services/category/categories.storeItems';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.css'
})
export class SidenavigationComponent implements OnDestroy{
  @Output() subCategoryClicked: EventEmitter<number> = new EventEmitter<number>()
  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(categoryStore: CategoriesStoreItem){
    this.subscriptions.add(categoryStore.categories$.subscribe(categories => {
      this.categories = categories
    }))
  }

  onSubCategoryClicked(subCategory: Category){
    this.subCategoryClicked.emit(subCategory.id)
  }

  getCategory(parent_category_id?: number): Category[]{
    return this.categories.filter(
      c => parent_category_id ? c.parent_category_id === parent_category_id : c.parent_category_id === null)
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
