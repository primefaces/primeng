import { Component } from '@angular/core';
import { FilterUtils } from '../../../components/utils/filterutils';
import { CarService } from '../../service/carservice';
import { Car } from '../../domain/car';

@Component({
    templateUrl: './filterutilsdemo.html'
})
export class FilterUtilsDemo {

    cars: Car[];

    cols: any[];

    constructor(private carService:CarService) {
        FilterUtils['custom-equals'] = (value, filter): boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
            
            return value.toString() === filter.toString();
        }

        this.cols = [
            { field: 'year', header: 'Year', filterMatchMode:'custom-equals' },
            { field: 'brand', header: 'Brand', filterMatchMode:'custom-equals' },
            { field: 'color', header: 'Color', filterMatchMode:'custom-equals' },
            { field: 'vin', header: 'Vin', filterMatchMode:'custom-equals' }
        ];

        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}