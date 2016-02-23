import {Component,OnInit} from 'angular2/core';
import {DataTable} from '../../../components/datatable/datatable';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Column} from '../../../components/api/column';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';
import {DataTableSubmenu} from './datatablesubmenu.component';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablefacetsdemo.html',
    directives: [DataTable,DataTableSubmenu,Header,Footer,TabPanel,TabView,ROUTER_DIRECTIVES],
    providers: [CarService]
})
export class DataTableFacetsDemo implements OnInit {

    cars: Car[];

    cols: Column[];

    constructor(private carService:CarService) {
    }

    ngOnInit() {
        this.cars = this.carService.getCarsSmall();

        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'brand', header: 'Brand'},
            {field: 'year', header: 'Year'},
            {field: 'color', header: 'Color'}
        ];
    }
}