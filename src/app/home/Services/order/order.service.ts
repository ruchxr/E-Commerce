import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartStoreItem } from "../cart/cart.storeItems";
import { UserService } from "../users/user.service";
import { deliveryAddress } from "../../types/cart.type";
import { Observable } from "rxjs";
import { Order, OrderItem } from "../../types/order.type";

@Injectable()
export class OrderService{
    constructor(
        private http: HttpClient,
        private cartStore: CartStoreItem,
        private userService: UserService
        ){}

    saveOrder(deliveryAddress: deliveryAddress, userEmail: string): Observable<any>{
        const url: string = 'http://localhost:5001/orders/add';
        const orderDetails: OrderItem[] = [];
        this.cartStore.cart.products.forEach(product => {
            const orderItem: OrderItem = {
                productId: product.product.id,
                price: product.product.price,
                qty: product.quantity,
                amount: product.amount
            };
            orderDetails.push(orderItem);
        });

        const order: Order = {
            userName: deliveryAddress.userName,
            userEmail: userEmail,
            address: deliveryAddress.address,
            city: deliveryAddress.city,
            state: deliveryAddress.state,
            pin: deliveryAddress.pin,
            total: this.cartStore.cart.totalAmount,
            orderDetails: orderDetails
        };
        console.log(order)
        return this.http.post(url, order,{
            headers: {authorization: this.userService.token}
        })
    }
}