import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: './datatablerowgroupdemo.html'
})
export class DataTableRowGroupDemo implements OnInit {

    cars1: Car[];
    
    cars2: Car[];
    
    cars3: Car[];
    
    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars1 = cars);
        this.carService.getCarsMedium().then(cars => this.cars2 = cars);
        this.carService.getCarsMedium().then(cars => this.cars3 = cars);
    }
    
    calculateGroupTotal(brand: string) {
        let total = 0;
        
        if(this.cars1) {
            for(let car of this.cars1) {
                if(car.brand === brand) {
                    total += car.price;
                }
            }
        }

        return total;
    }
}