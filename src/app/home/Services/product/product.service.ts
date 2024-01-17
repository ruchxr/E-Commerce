import { Injectable } from "@angular/core";
import { Product } from "../../types/products.type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor(private http: HttpClient){}

    getAllProducts(query?: string): Observable<Product[]>{
        let url: string = 'http://localhost:5001/products';
        if(query){
            url += '?' + query;
        }
        return this.http.get<Product[]>(url)
    }

    getProduct(id: number): Observable<Product[]>{
        const url: string = 'http://localhost:5001/products/' + id;
        return this.http.get<Product[]>(url);
    }
}