import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';

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

        @media (max-width: 40em) {
            .car-item {
                text-align: center;
            }
        }
    `]
})
export class VirtualScrollerDemo implements OnInit {

    cars: Car[] = [];
    
    brands: string[];

    colors: string[];

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
    
}