import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatableresponsivedemo.html',
})
export class DataTableResponsiveDemo implements OnInit {

    cars: Car[];
    
    stacked: boolean;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
    
    toggle() {
        this.stacked = !this.stacked;
    }
}