import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {DataTable} from '../../../components/datatable/datatable';
import {Button} from '../../../components/button/button';
import {InputText} from '../../../components/inputtext/inputtext';
import {Dialog} from '../../../components/dialog/dialog';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/api/column';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablecruddemo.html',
    directives: [DataTable,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,Header,Footer,Dialog,Button,InputText,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService],
    styles: [`
        .ui-grid-row div {
          padding: 4px 10px
        }
        
        .ui-grid-row div label {
          font-weight: bold;
        }
  `]
})
export class DataTableCrudDemo implements OnInit {

    displayDialog: boolean;

    car: Car = new PrimeCar();
    
    selectedCar: Car;
    
    newCar: boolean;

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
    
    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }
    
    save() {
        if(this.newCar)
            this.cars.push(this.car);
        else
            this.cars[this.findSelectedCarIndex()] = this.car;
        
        this.car = null;
        this.displayDialog = false;
    }
    
    delete() {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(c: Car): Car {
        let car = new PrimeCar();
        for(let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
    
    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}

class PrimeCar implements Car {
    
    constructor(public vin?, public year?, public brand?, public color?) {}
}