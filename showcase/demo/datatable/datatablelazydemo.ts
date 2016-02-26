import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {DataTable} from '../../../components/datatable/datatable';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/api/column';
import {Header} from '../../../components/common/header';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablelazydemo.html',
    directives: [DataTable,Header,DataTableSubmenu,TabPanel,TabView,pCode,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableLazyDemo implements OnInit {

    datasource: Car[];
    
    cars: Car[];

    cols: Column[];
    
    totalRecords: number;

    constructor(private carService: CarService) { }

    ngOnInit() {
        //datasource imitation
        this.carService.getCarsLarge().then(cars => {this.datasource = cars; this.totalRecords = this.datasource.length;});

        this.cols = [
            {field: 'vin', header: 'Vin', sortable: true},
            {field: 'brand', header: 'Brand', sortable: true},
            {field: 'year', header: 'Year', sortable: true},
            {field: 'color', header: 'Color', sortable: true}
        ];
    }
    
    loadCarsLazy(event) {
        console.log('lazy pre');
        this.cars = this.datasource.slice(event.first, (event.first + event.rows));
        console.log('lazy post');
    }
}