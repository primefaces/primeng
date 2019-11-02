import { Component } from '@angular/core';
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
        {label: 'Volvo', value: 'Volvo'}
    ];

    filteredBrands: any[];

    brand:any;

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

    filterWithContains(event) {
        this.filteredBrands = FilterUtils.filter(this.brands, ['value'], event.query, "contains");
    }
}