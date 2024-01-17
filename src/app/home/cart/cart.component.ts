import { Component, OnDestroy, OnInit } from '@angular/core';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../Services/cart/cart.storeItems';
import { Router } from '@angular/router';
import { CartItem, deliveryAddress } from '../types/cart.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loggedInUser } from '../types/user.type';
import { Subscription } from 'rxjs';
import { UserService } from '../Services/users/user.service';
import { OrderService } from '../Services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  faTrash = faTrash;
  orderForm!: FormGroup;
  user: loggedInUser;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;
  alertType: number = 0;
  alertMessage: string = '';
  disabledCheckout: boolean = false;
  userAuthenticated: boolean = true;

  constructor(
    public cartStore: CartStoreItem, 
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService){
      this.user = {
        firstName: '',
        lastName: '',
        address: '',
        pin: '',
        city: '',
        state: '',
        email: ''
      };

        this.userService.loggedInUser$
        .subscribe(
          userInfo => {
            this.user = userInfo
            console.log(this.user)
          }
        )

        if(userService.isUserAuthenticated){
          this.userAuthenticated = true;
        }
        else{
          this.userAuthenticated = false;
        }
    }

  navigateToHome(){
    this.router.navigate(['home/products'])
  }

  updateQuantity($event: any, cartItem: CartItem){
    if($event.target.innerText === '+'){
      this.cartStore.addProducts(cartItem.product)
    }
    else if($event.target.innerText === '-'){
      this.cartStore.decreaseProductQuantity(cartItem)
    }
  }

  removeItem(cartItem: CartItem){
    this.cartStore.removeProduct(cartItem)
  }

  ngOnInit(): void {
    if(this.userService.isUserAuthenticated){
      this.orderForm = this.fb.group({
        name: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
        address: [`${this.user.address}`, Validators.required],
        city: [`${this.user.city}`, Validators.required],
        state: [`${this.user.state}`, Validators.required],
        pin: [`${this.user.pin}`, Validators.required]
      })}
      else{
        this.orderForm = this.fb.group({
          name: '',
          address: '',
          city: '',
          state: '',
          pin: ''
        })
      }
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  onSubmit(){
    if(this.userService.isUserAuthenticated){
      const deliveryAddress: deliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value
      };

      this.subscriptions.add(
        this.orderService.saveOrder(
          deliveryAddress,
          this.user.email
        )
        .subscribe(
          {
            next: result => {
              this.cartStore.clearCart();
              this.alertType = 0;
              this.alertMessage = 'Order registered successfully!';
              this.disabledCheckout = true;
            },
            error: (error) => {
              this.alertType = 2;
              if(error.error.message === 'Authentication failed!'){
                this.alertMessage = 'Please log in to register your order.'
              }
              else{
                this.alertMessage = error.error.message;
              }
            }
          }
        )
      )
    }
  }
}
