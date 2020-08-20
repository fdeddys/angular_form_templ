import { Component, OnInit } from '@angular/core';
import { SessionStorageService} from 'ngx-webstorage';
import { Product } from './product';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    constructor(
        private productService: ProductService,
        private router: Router) { }

    products: Product[] = [];

    ngOnInit() {
        this.getListProduct();
    }

    getListProduct() {

        let allProduct: Product[];
        allProduct = this.productService.getAllData();

        allProduct.forEach(prod => {
            // console.log('isi', prod.kode);
            let prodNew = new Product();
            prodNew.kode = prod.kode;
            prodNew.name = prod.name;

            this.products.push(prodNew);
        });
    }

    addNew() {
        // this.router.navigate(['/product/0']);
        this.gotoEditPage('0');
    }

    gotoEditPage(kode : string) {
        this.router.navigate(['/product/' + kode]);
    }

};
