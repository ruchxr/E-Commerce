import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { faHeart, faSearch, faShoppingBag, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../Services/category/categories.storeItems';
import { Category } from '../types/category.type';
import { Subscription } from 'rxjs';
import { SearchKeyword } from '../types/searchKeyword.type';
import { NavigationEnd, Route, Router } from '@angular/router';
import { CartStoreItem } from '../Services/cart/cart.storeItems';
import { filter } from 'rxjs/operators';
import { UserService } from '../Services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnDestroy{
  faSearch = faSearch;
  userCircle = faUserCircle;
  faShopping = faShoppingCart;
  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();
  subscription: Subscription = new Subscription();

  displayOptions: boolean = true;

  isUserAuthenticated: boolean = false;
  userName: string = '';

  @Output() searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  constructor(private categoryStore: CategoriesStoreItem, 
    private router: Router,
    public cartStore: CartStoreItem,
    public userService: UserService){
    this.subscriptions.add(
      this.categoryStore.categories$
      .subscribe(
        categories => {
          this.categories = categories.filter(
            category => category.parent_category_id === null
          )
        }
      )
    )

    router.events
    .pipe(filter(events => events instanceof NavigationEnd))
    .subscribe(
      event => {
        this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true : false;
      }
    )

    this.subscription.add(
      this.userService.isUserAuthenticated$
      .subscribe(result => {
        this.isUserAuthenticated = result;
      })
    )

    this.subscription.add(
      this.userService.loggedInUser$
      .subscribe(result => {
        this.userName = result.firstName;
      })
    )
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      this.subscription.unsubscribe();
  }

  onSearchbtnClicked(categoryId: string, keyword: string){
    this.searchClicked.emit({keyword: keyword, category_id: parseInt(categoryId)});
  }

  navigateToCart(){
    this.router.navigate(['home/cart'])
  }

  logout(){
    this.userService.logout();
  }
}
