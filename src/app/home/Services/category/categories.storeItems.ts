import { Observable } from "rxjs-compat";
import { StoreItem } from "../../../shared/storeItem";
import { Category } from "../../types/category.type";
import { CategoryService } from "./category.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoriesStoreItem extends StoreItem<Category[]> {
    constructor(private categoryService: CategoryService) {
        super([]);
    }

    async loadCategories() {
        this.categoryService.getAllCategories()
            .subscribe(categories => {
                this.setValue(categories);
            });
    }

    get categories$(): Observable<Category[]> {
        return this.value$; 
    }
}
