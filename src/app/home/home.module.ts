import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CatnavigationComponent } from './catnavigation/catnavigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './Services/category/category.service';
import { CategoriesStoreItem } from './Services/category/categories.storeItems';
import { ProductsStoreItems } from './Services/product/products.storeItems';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductsComponent } from './detail-products/detail-products.component';
import { ProductsGalleryComponent } from './products-gallery/products-gallery.component';
import { CartStoreItem } from './Services/cart/cart.storeItems';
import { CartComponent } from './cart/cart.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserService } from './Services/users/user.service';
import { OrderService } from './Services/order/order.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsGalleryComponent
      },
      {
        path: 'product/:id',
        component: DetailProductsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'signup',
        component: UserSignupComponent
      },
      {
        path: 'login',
        component: UserLoginComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    DetailProductsComponent,
    ProductsGalleryComponent,
    CartComponent,
    UserSignupComponent,
    UserLoginComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CategoryService, CategoriesStoreItem, ProductsStoreItems, CartStoreItem, UserService, OrderService]
})
export class HomeModule { }
