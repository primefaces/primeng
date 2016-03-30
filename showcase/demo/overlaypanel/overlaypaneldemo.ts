import {Component} from 'angular2/core';
import {OverlayPanel} from '../../../components/overlaypanel/overlaypanel';
import {Button} from '../../../components/button/button';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {DataTable} from '../../../components/datatable/datatable';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {CarService} from '../service/carservice';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    templateUrl: 'showcase/demo/overlaypanel/overlaypaneldemo.html',
    directives: [OverlayPanel,DataTable,Column,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
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