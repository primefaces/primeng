import { Component, OnInit } from '@angular/core';
import { CarService } from '../../service/carservice';
import { Car } from '../../domain/car';
import { SelectItem, FilterService, FilterMatchMode } from 'primeng/api';

@Component({
    templateUrl: './filterservicedemo.html'
})
export class FilterServiceDemo implements OnInit {

    cars: Car[];

    cols: any[];

    matchModeOptions: SelectItem[];

    constructor(private carService:CarService, private filterService: FilterService) {}

    ngOnInit() {
        const customFilterName = 'custom-equals';

        this.filterService.register(customFilterName, (value, filter): boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
            
            return value.toString() === filter.toString();
        });

        this.cols = [
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' },
            { field: 'vin', header: 'Vin' }
        ];

        this.matchModeOptions = [
            { label: 'Custom Equals', value: customFilterName },
            { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
            { label: 'Contains', value: FilterMatchMode.CONTAINS },
        ];

        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}