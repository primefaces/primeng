import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {LazyLoadEvent,SelectItem} from 'primeng/api';

@Component({
    templateUrl: './virtualscrollerdemo.html',
    styles: [`
        .car-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
        }

        .car-details > div {
            display: flex;
            align-items: center;
        }

        .car-item-image {
            margin-right: 14px;
            width: 60px;
            height: 60px;
        }

        .empty-car-item-image {
            background-color: #f1f1f1;
            animation: pulse 1s infinite ease-in-out;
            margin-right: 14px;
            border-radius: 3px;
        }

        .empty-car-item-text {
            background-color: #f1f1f1;
            height: 19px;
            animation: pulse 1s infinite ease-in-out;
            display: block;
            width: 100px;
            margin-bottom: 2px;
            border-radius: 3px;
        }

        .empty-car-item-button {
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
            .car-item {
                text-align: center;
            }
        }
    `]
})
export class VirtualScrollerDemo implements OnInit {

    cars: Car[] = [];

    lazyCars: Car[];
    
    brands: string[];

    colors: string[];

    totalLazyCarsLength: number;

    timeout: any;

    sortKey: string;

    sortOptions: SelectItem[];

    ngOnInit() {
        this.brands = [
            'Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'
        ];

        this.colors = [
            'Black', 'White', 'Red', 'Blue', 'Silver', 'Green', 'Yellow'
        ];

        for (let i = 0; i < 10000; i++) {
            this.cars.push(this.generateCar());
        }

        //in a real application, make a remote request to retrieve the number of records only, not the actual records
        this.totalLazyCarsLength = 10000;

        this.sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'}
        ];
    }

    generateCar(): Car {
        return {
            vin: this.generateVin(),
            brand: this.generateBrand(),
            color: this.generateColor(),
            year: this.generateYear()
        }
    }

    generateVin() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateBrand() {
        return this.brands[Math.floor(Math.random() * Math.floor(10))];
    }

    generateColor() {
        return this.colors[Math.floor(Math.random() * Math.floor(7))];
    }

    generateYear() {
        return 2000 + Math.floor(Math.random() * Math.floor(19));
    }

    loadCarsLazy(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page

        //imitate db connection over a network
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        
        this.timeout = setTimeout(() => {
            this.lazyCars = [];
            if (this.cars) {
                this.lazyCars = this.cars.slice(event.first, (event.first + event.rows));
            }
        }, 1000);
    }

    onSortChange() {
        if (this.sortKey.indexOf('!') === 0)
            this.sort(-1);
        else
            this.sort(1);
    }

    sort(order: number): void {
        let cars = [...this.cars];
        cars.sort((data1, data2) => {
            let value1 = data1.year;
            let value2 = data2.year;
            let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (order * result);
        });

        this.cars = cars;
    }
}