import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {DataTable} from '../../../components/datatable/datatable';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/api/column';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablesortdemo.html',
    directives: [DataTable,DataTableSubmenu,TabPanel,TabView,pCode,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableSortDemo implements OnInit {

    cars: Car[];

    cols: Column[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            {field: 'vin', header: 'Vin', sortable: true},
            {field: 'brand', header: 'Brand', sortable: true},
            {field: 'year', header: 'Year', sortable: true},
            {field: 'color', header: 'Color', sortable: true}
        ];
    }
}