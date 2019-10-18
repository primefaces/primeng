import {Component} from '@angular/core';
import { FilterUtils } from '../../../components/utils/filterutils';
import { CarService } from '../../service/carservice';
import { Car } from '../../domain/car';

@Component({
    templateUrl: './filterutilsdemo.html'
})
export class FilterUtilsDemo {

    brands: any[] = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'},
    ];

    filteredBrands: any[];

    brand:any;

    cars: Car[];

    cols: any[];

    constructor(private carService:CarService) {
        FilterUtils['custom'] = (value, filter): boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
            
            return value.toString() === filter.toString();
        }

        this.cols = [
            { field: 'year', header: 'Year', filterMatchMode:'custom' },
            { field: 'brand', header: 'Brand', filterMatchMode:'custom' },
            { field: 'color', header: 'Color', filterMatchMode:'custom' },
            { field: 'vin', header: 'Vin', filterMatchMode:'custom' }
        ];
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }

    filterWithContains(event) {
        this.filteredBrands = FilterUtils['filter'](this.brands,['value'],event.query,"contains");
    }
}