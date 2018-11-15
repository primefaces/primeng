import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {LazyLoadEvent} from '../../../components/common/api';

@Component({
    templateUrl: './virtualscrollerdemo.html',
    styles: [`
        .car-item {
            border-bottom: 1px solid #D5D5D5;
        }

        .car-item .ui-md-3 {
            text-align: center;
        }
        
        .car-item .ui-g-10 {
            font-weight: bold;
        }

        .empty-car-item-index {
            background-color: #f1f1f1;
            width: 60px;
            height: 60px;
            margin: 36px auto 0 auto;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-image {
            background-color: #f1f1f1;
            width: 120px;
            height: 120px;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-text {
            background-color: #f1f1f1;
            height: 18px;
            animation: pulse 1s infinite ease-in-out;
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

    constructor(private carService: CarService) { }

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
        return this.brands[Math.floor(Math.random() * Math.floor(7))];
    }

    generateYear() {
        return 2000 + Math.floor(Math.random() * Math.floor(19));
    }

    loadCarsLazy(event: LazyLoadEvent) {
        console.log('loading lazy ' + event.first); 
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
}