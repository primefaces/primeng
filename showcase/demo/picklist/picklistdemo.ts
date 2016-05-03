import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS}    from '@angular/http';
import {PickList} from '../../../components/picklist/picklist';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/picklist/picklistdemo.html',
    directives: [PickList,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class PickListDemo {

    sourceCars: Car[];
    
    targetCars: Car[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.sourceCars = cars);
        this.targetCars = [];
    }
}