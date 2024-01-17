import { Injectable } from "@angular/core";
import { StoreItem } from "../../../shared/storeItem";
import { Product } from "../../types/products.type";
import { ProductService } from "./product.service";
import { Observable } from "rxjs-compat";
// import { Observable } from "r";

@Injectable()
export class ProductsStoreItems extends StoreItem<Product[]>{
    
    constructor(private productsService: ProductService){
        super([]);
    }

    async loadProducts(query?: string){
        this.productsService.getAllProducts(query)
        .subscribe((products) => {
            this.setValue(products);
        })
    }

    get products$(): Observable<Product[]>{
        return this.value$;
    }
}