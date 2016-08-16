import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DataTable} from '../../../components/datatable/datatable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablesortdemo.html',
    directives: [DataTable,Column,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DataTableSortDemo implements OnInit {

    cars1: Car[];
    
    cars2: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);
    }
}