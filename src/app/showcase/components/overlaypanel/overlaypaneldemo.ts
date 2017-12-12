import {Component} from '@angular/core';
import {OverlayPanel} from '../../../components/overlaypanel/overlaypanel';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';

@Component({
    templateUrl: './overlaypaneldemo.html'
})
export class OverlayPanelDemo {

    cars1: Car[];
    
    cars2: Car[];
    
    selectedCar: Car;
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);
    }
    
    selectCar(event,car: Car, overlaypanel: OverlayPanel) {
        this.selectedCar = car;
        overlaypanel.toggle(event);
    }
}