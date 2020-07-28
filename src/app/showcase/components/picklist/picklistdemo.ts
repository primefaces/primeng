import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {ProductService} from '../../service/productservice';

@Component({
    templateUrl: './picklistdemo.html',
    styleUrls: ['./picklistdemo.scss']
})
export class PickListDemo {

    sourceProducts: Car[];
    
    targetProducts: Car[];
    
    constructor(private carService: ProductService) { }

    ngOnInit() {
        this.carService.getProductsSmall().then(products => this.sourceProducts = products);
        this.targetProducts = [];
    }
}