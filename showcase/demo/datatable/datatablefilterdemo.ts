import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {DataTable} from '../../../components/datatable/datatable';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/api/column';
import {Header} from '../../../components/common/header';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablefilterdemo.html',
    directives: [DataTable,Header,DataTableSubmenu,TabPanel,TabView,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableFilterDemo implements OnInit {

    cars: Car[];

    cols: Column[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            {field: 'vin', header: 'Vin (startsWith)', filter: true},
            {field: 'brand', header: 'Brand (contains)', filter: true, filterMatchMode: 'contains'},
            {field: 'year', header: 'Year (startsWith)', filter: true},
            {field: 'color', header: 'Color (endsWith)', filter: true, filterMatchMode: 'endsWith'}
        ];
    }
}