import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS}    from '@angular/http';
import {DataTable} from '../../../components/datatable/datatable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';
import {Growl} from '../../../components/growl/growl';
import {ContextMenu} from '../../../components/contextmenu/contextmenu';
import {Message} from '../../../components/api/message';
import {MenuItem} from '../../../components/api/menumodel';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablecmdemo.html',
    directives: [DataTable,Column,Header,Footer,Growl,ContextMenu,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DataTableCMDemo implements OnInit {

    msgs: Message[];

    cars: Car[];

    selectedCar: Car;
    
    items: MenuItem[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        
        this.items = [
            {label: 'View', icon: 'fa-search', command: (event) => this.viewCar(this.selectedCar)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteCar(this.selectedCar)}
        ];
    }

    viewCar(car: Car) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand});
    }

    deleteCar(car: Car) {
        let index = -1;
        for(let i = 0; i < this.cars.length; i++) {
            if(this.cars[i].vin == car.vin) {
                index = i;
                break;
            }
        }
        this.cars.splice(index, 1);
        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand});
    }
}