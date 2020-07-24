import {Component} from '@angular/core';
import {OverlayPanel} from '../../../components/overlaypanel/overlaypanel';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';

@Component({
    templateUrl: './overlaypaneldemo.html',
    styleUrls: ['./overlaypanel.scss']
})
export class OverlayPanelDemo {

    cars1: Car[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
    }
}