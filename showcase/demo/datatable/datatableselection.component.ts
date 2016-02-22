import {Component,OnInit} from 'angular2/core';
import {DataTable} from '../../../components/datatable/datatable';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Car} from '../domain/car';
import {Column} from '../../../components/api/column';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';

@Component({
    templateUrl: 'showcase/demo/datatable/datatableselection.component.html',
    directives: [DataTable,Header,Footer,Growl,DataTableSubmenu,TabPanel,TabView,ROUTER_DIRECTIVES],
    providers: [CarService]
})
export class DataTableSelectionDemo implements OnInit {

    msgs: Message[];

    cars: Car[];

    cols: Column[];

    selectedCar1: Car;

    selectedCar2: Car;

    selectedCars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.cars = this.carService.getCarsSmall();

        this.cols = [
            {field: 'vin', headerText: 'Vin'},
            {field: 'brand', headerText: 'Brand'},
            {field: 'year', headerText: 'Year'},
            {field: 'color', headerText: 'Color'}
        ];
    }

    onRowSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand});
    }

    onRowUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand});
    }
}