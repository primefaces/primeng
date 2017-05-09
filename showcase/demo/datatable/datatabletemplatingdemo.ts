import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Message} from '../../../components/common/api';

export class CarViewModel implements Car {
    constructor(private car: Car) { } 

    get vin() {return this.car.vin;};
    get year() {return this.car.year;};
    get brand() {return this.car.brand;};
    get color() {return this.car.color;};
    get price() {return this.car.price;};
    get saleDate() {return this.car.saleDate;};

    get colorCellClass() {
        return ('car-' + this.color).toLowerCase();
    }
}

@Component({
    templateUrl: 'showcase/demo/datatable/datatabletemplatingdemo.html',
})
export class DataTableTemplatingDemo implements OnInit {

    cars: CarViewModel[];
    
    msgs: Message[] = [];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars.map(car => new CarViewModel(car)));
    }
    
    selectCar(car: Car) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Car Select', detail:'Vin: ' + car.vin});
    }

    calculateColorCellClass(car: Car) {
        return 'car-' + car.color;
    }
}