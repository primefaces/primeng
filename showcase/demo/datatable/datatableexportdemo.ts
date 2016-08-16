import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DataTable} from '../../../components/datatable/datatable';
import {Button} from '../../../components/button/button';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';
import {Header} from '../../../components/common';

@Component({
    templateUrl: 'showcase/demo/datatable/datatableexportdemo.html',
    directives: [DataTable,Column,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,Header,Button,ROUTER_DIRECTIVES]
})
export class DataTableExportDemo implements OnInit {

    cars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }

}