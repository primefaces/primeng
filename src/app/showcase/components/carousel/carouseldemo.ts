import {Component} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';
import {Car} from '../../components/domain/car';

@Component({
    templateUrl: './carouseldemo.html',
    providers: [MessageService],
    styles: [`
        .ui-grid-row {
            text-align: center;
        }

        .ui-grid {
            margin: 10px 0px;
        }

        .ui-grid-row > div {
            padding: 4px 10px;
        }
    `]
})
export class CarouselDemo {

    cars: Car[];

    constructor(private messageService: MessageService) {
        this.cars = [
            {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
            {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
            {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
            {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
            {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
            {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
            {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
            {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
            {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
        ];
    }
    
    selectCar(car: Car) {
        this.messageService.add({severity: 'info', summary: 'Car Selected', detail: 'Vin:' + car.vin});
    }
}
