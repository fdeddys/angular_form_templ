import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product';
import { SessionStorageService } from 'ngx-webstorage';
import { ProductService } from '../product.service';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

    code = '';
    curProduct: Product = new Product();
    editIdx = -1;
    products: Product[] = [];
    prodForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private fb: FormBuilder,
    ) {
        this.prodForm = this.fb.group({
            kode: ['', Validators.required ],
            name: ['', Validators.required ]
        });
    }

    ngOnInit() {
        this.code = this.route.snapshot.paramMap.get('code');
        if (this.code === '0') {
            this.getAllProductFromStorage();
            this.newProduct();
        } else {
            this.editProduct(this.code);
        }
    }

    get f() { return this.prodForm.controls; }

    newProduct() {
        this.curProduct.kode = '';
        this.curProduct.name = '';
    }

    getAllProductFromStorage() {
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

    editProduct(editCode: string) {
        this.newProduct();

        let allProduct : Product[];
        allProduct = this.productService.getAllData();

        allProduct.forEach((prod, curIdx) => {
            // console.log('isi', prod.kode);
            let prodNew = new Product();
            prodNew.kode = prod.kode;
            prodNew.name = prod.name;

            this.products.push(prodNew);

            if (prod.kode === editCode) {
                // this.curProduct.kode = prod.kode;
                // this.curProduct.name = prod.name;
                this.editIdx = curIdx;
                this.prodForm.controls['name'].setValue(prod.name);
                this.prodForm.controls['kode'].setValue(prod.kode);
                return;
            }
        });
    }

    onSubmit() {
        console.log('nama', this.prodForm.controls['name'].value);

        if (this.prodForm.invalid) {
            console.log('invalid form !');
            return;
        }
        let currProd = new Product();
        currProd.kode = this.prodForm.controls['kode'].value;
        currProd.name =this.prodForm.controls['name'].value;

        if (this.editIdx === -1 ) {
            this.products.push(currProd);
        } else {
            this.products[this.editIdx].kode = currProd.kode;
            this.products[this.editIdx].name = currProd.name;
        }
        this.productService.saveData(this.products);
        this.backBtn();
    }

    backBtn() {
        this.router.navigate(['/product']);
    }

}
