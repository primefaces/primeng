import {Component,OnInit} from '@angular/core';
import {CarService} from '../../service/carservice';
import {LazyLoadEvent,SelectItem} from 'primeng/api';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './virtualscrollerdemo.html',
    styles: [`
        .product-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
        }

        .product-details > div {
            display: flex;
            align-items: center;
        }

        .product-item-image {
            margin-right: 14px;
            width: 60px;
            height: 60px;
        }

        .empty-product-item-image {
            background-color: #f1f1f1;
            animation: pulse 1s infinite ease-in-out;
            margin-right: 14px;
            border-radius: 3px;
        }

        .empty-product-item-text {
            background-color: #f1f1f1;
            height: 19px;
            animation: pulse 1s infinite ease-in-out;
            display: block;
            width: 100px;
            margin-bottom: 2px;
            border-radius: 3px;
        }

        .empty-product-item-button {
            background-color: #f1f1f1;
            height: 33px;
            width: 33px;
            animation: pulse 1s infinite ease-in-out;
            display: block;
            border-radius: 3px;
        }

        .list-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .title-container {
            text-align: left;
        }

        .sort-container {
            text-align: right;
        }

        @media (max-width: 40em) {
            .product-item {
                text-align: center;
            }
        }
    `]
})
export class VirtualScrollerDemo implements OnInit {

    products: Product[];

    virtualProducts: Product[];

    sortKey: string;

    sortOptions: SelectItem[];

    constructor(private carService: CarService, private productService: ProductService) {}

    ngOnInit() {
        this.products = Array.from({length: 10000}).map(() => this.productService.generatePrduct());
        this.virtualProducts = Array.from({length: 10000});

        this.sortOptions = [
            {label: 'Cheapest First', value: 'price'},
            {label: 'Expensive First', value: '!price'}
        ];
    }

    loadCarsLazy(event: LazyLoadEvent) {       
        // simulate remote connection with a timeout 
        setTimeout(() => {
            //load data of required page
            let loadedProducts = this.products.slice(event.first, (event.first + event.rows));

            //populate page of virtual cars
            Array.prototype.splice.apply(this.virtualProducts, [...[event.first, event.rows], ...loadedProducts]);
            
            //trigger change detection
            this.virtualProducts = [...this.virtualProducts];
        }, 1000);
    }

    onSortChange() {
        if (this.sortKey.indexOf('!') === 0)
            this.sort(-1);
        else
            this.sort(1);
    }

    sort(order: number): void {
        let products = [...this.products];
        products.sort((data1, data2) => {
            let value1 = data1.price;
            let value2 = data2.price;
            let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (order * result);
        });

        this.products = products;
    }
}