import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS}    from '@angular/http';
import {DataTable} from '../../../components/datatable/datatable';
import {Column} from '../../../components/column/column';
import {Button} from '../../../components/button/button';
import {Growl} from '../../../components/growl/growl';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';
import {Message} from '../../../components/common';

@Component({
    templateUrl: 'showcase/demo/datatable/datatabletemplatingdemo.html',
    directives: [DataTable,Column,Button,Growl,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableTemplatingDemo implements OnInit {

    cars: Car[];
    
    msgs: Message[] = [];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
    
    selectCar(car: Car) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Car Select', detail:'Vin: ' + car.vin});
    }
}