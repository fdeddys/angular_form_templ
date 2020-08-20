import { Injectable } from '@angular/core';
import { Product } from './product';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    keyStorage = 'listProduct';

    constructor(
        private storage: SessionStorageService,
    ) { }

    getAllData() {

        let allProduct: Product[];

        allProduct = this.storage.retrieve(this.keyStorage);
        if (allProduct == null) {
            console.log('product empty !');
            return [];
        }
        return allProduct;
    }

    saveData(productList: Product[]) {
        this.storage.clear(this.keyStorage);
        this.storage.store(this.keyStorage, productList);
    }
}
