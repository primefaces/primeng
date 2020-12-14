import {Component} from '@angular/core';

@Component({
    templateUrl: './scrolltopdemo.html',
    styleUrls: ['./scrolltopdemo.scss']
})
export class ScrollTopDemo {

    products: any[];

    ngOnInit() {
        this.products = new Array(5);
    }
}