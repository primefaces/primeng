import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS}    from '@angular/http';
import {DataTable} from '../../../components/datatable/datatable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatabledemo.html',
    directives: [DataTable,Column,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DataTableDemo implements OnInit {

    cars: Car[];
    
    cols: any[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        
        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];
    }
}