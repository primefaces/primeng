import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DataTable} from '../../../components/datatable/datatable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Column} from '../../../components/column/column';
import {Header} from '../../../components/common';
import {Footer} from '../../../components/common';
import {DataTableSubmenu} from './datatablesubmenu.component';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablefacetsdemo.html',
    directives: [DataTable,Column,DataTableSubmenu,Header,Footer,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DataTableFacetsDemo implements OnInit {

    cars: Car[];

    constructor(private carService:CarService) {}

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
}