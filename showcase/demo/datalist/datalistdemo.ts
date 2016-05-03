import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS}    from '@angular/http';
import {DataList} from '../../../components/datalist/datalist';
import {Header} from '../../../components/common/header';
import {Footer} from '../../../components/common/footer';
import {Panel} from '../../../components/panel/panel';
import {Button} from '../../../components/button/button';
import {Dialog} from '../../../components/dialog/dialog';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datalist/datalistdemo.html',
    directives: [DataList,Header,Footer,Dialog,Panel,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,CarService],
    styles: [`
        .ui-grid-row > div {
            padding: 4px 10px;
            font-size: 20px;
        }
        
        .ui-grid-row .ui-grid-row > div:last-child {
            font-weight: bold;
        }
    `]
})
export class DataListDemo implements OnInit {

    cars: Car[];
    
    selectedCar: Car;
    
    displayDialog: boolean;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);
    }
    
    selectCar(car: Car) {
        this.selectedCar = car;
        this.displayDialog = true;
    }
    
    onDialogHide() {
        this.selectedCar = null;
    }
}