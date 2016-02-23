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
    templateUrl: 'showcase/demo/datatable/datatablescrolldemo.html',
    directives: [DataTable,Header,DataTableSubmenu,TabPanel,TabView,pCode,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableScrollDemo implements OnInit {

    cars: Car[];

    cols1: Column[];
    
    cols2: Column[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);

        this.cols1 = [
            {field: 'vin', header: 'Vin',},
            {field: 'brand', header: 'Brand'},
            {field: 'year', header: 'Year'},
            {field: 'color', header: 'Color'}
        ];
        
        this.cols2 = [
            {field: 'vin', header: 'Vin', style: 'width:250px'},
            {field: 'brand', header: 'Brand', style: 'width:250px'},
            {field: 'year', header: 'Year', style: 'width:250px'},
            {field: 'color', header: 'Color', style: 'width:250px'}
        ];
    }
}