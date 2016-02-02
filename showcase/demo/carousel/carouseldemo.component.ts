import {Component} from 'angular2/core';
import {Carousel} from '../../../components/carousel/carousel';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Car} from '../common/car';

@Component({
    templateUrl: 'showcase/demo/carousel/carouseldemo.component.html',
    directives: [Carousel,TabPanel,TabView,Button,Growl,ROUTER_DIRECTIVES],
    styles: [`
        .pui-grid-row {
            text-align: center;
        }

        .pui-grid {
            margin: 10px 0px;
        }

        .pui-grid-row > div {
            padding: 4px 10px;
        }
    `]
})
export class CarouselDemoComponent {

    cars: Car[];

    msgs: Message[];

    constructor() {
        this.msgs = [];
        this.cars = [];
        this.cars.push(new Car('r3278r2',2010,'Audi', 'Black'));
        this.cars.push(new Car('jhto2g2',2015,'BMW', 'White'));
        this.cars.push(new Car('h453w54',2012,'Honda', 'Blue'));
        this.cars.push(new Car('g43gwwg',1998,'Renault', 'Red'));
        this.cars.push(new Car('gf45wg5',2011,'Volkswagen','White'));
        this.cars.push(new Car('bhv5y5w',2015,'Volvo', 'Black'));
        this.cars.push(new Car('ybw5fsd',1999,'Jaguar', 'Gray'));
        this.cars.push(new Car('45665e5',1996,'Mercedes', 'Black'));
        this.cars.push(new Car('he6sb5v',2012,'Ford', 'Blue'));
    }

    selectCar(car: Car) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Selected', detail: 'Vin:' + car.vin});
    }
}