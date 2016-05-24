import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS}    from '@angular/http';
import {DataTable} from '../../../components/datatable/datatable';
import {Button} from '../../../components/button/button';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {Header} from '../../../components/common';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatableresponsivedemo.html',
    directives: [DataTable,Column,Header,Button,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableResponsiveDemo implements OnInit {

    cars: Car[];
    
    stacked: boolean;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
    
    toggle() {
        this.stacked = !this.stacked;
    }
}