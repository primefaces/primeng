import {Component} from '@angular/core';
import { Product } from '../../domain/product';
import {ProductService} from '../../service/productservice';

@Component({
    templateUrl: './picklistdemo.html',
    styleUrls: ['./picklistdemo.scss']
})
export class PickListDemo {

    sourceProducts: Product[];
    
    targetProducts: Product[];
    
    constructor(private carService: ProductService) { }

    ngOnInit() {
        this.carService.getProductsSmall().then(products => this.sourceProducts = products);
        this.targetProducts = [];
    }
}