import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './tablestyledemo.html',
    styles: [`
        .outofstock {
            font-weight: 700;
            color: #FF5252;
            text-decoration: line-through;
        }
        
        .lowstock {
            font-weight: 700;
            color: #FFA726;
        }
        
        .instock {
            font-weight: 700;
            color: #66BB6A;
        }
        
        :host ::ng-deep .row-accessories {
            background-color: rgba(0,0,0,.15) !important;
        }
    `
    ]
})
export class TableStyleDemo implements OnInit {

    products: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
    }
    
}