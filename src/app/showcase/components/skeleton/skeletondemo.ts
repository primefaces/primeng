import {Component} from '@angular/core';

@Component({
    templateUrl: './skeletondemo.html',
    styleUrls: ['./skeletondemo.scss']
})
export class SkeletonDemo {

    products: any[];

    ngOnInit() {
        this.products = new Array(5);
    }
    
}