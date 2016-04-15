import {Component} from 'angular2/core';
import {Draggable} from '../../../components/dragdrop/draggable';
import {Droppable} from '../../../components/dragdrop/droppable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {DataTable} from '../../../components/datatable/datatable';
import {CarService} from '../service/carservice';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    templateUrl: 'showcase/demo/dragdrop/dragdropdemo.html',
    directives: [Draggable,Droppable,Button,TabView,TabPanel,Column,DataTable,CodeHighlighter,ROUTER_DIRECTIVES],
    styles: [`
        .ui-grid li {
            list-style-type: none;
            padding: 10px;
            margin-bottom: 5px;
        }
    `],
    providers: [HTTP_PROVIDERS,CarService]
})
export class DragDropDemo {
    
    availableCars: Car[];
    
    selectedCars: Car[];
    
    draggedCar: Car;
    
    constructor(private carService: CarService) { }
    
    ngOnInit() {
        this.selectedCars = [];
        this.carService.getCarsSmall().then(cars => this.availableCars = cars);
    }
    
    dragStart(event,car: Car) {
        this.draggedCar = car;
        console.log(this.draggedCar);
    }
    
    drop(event) {
        if(this.draggedCar) {
            this.selectedCars.push(this.draggedCar);
            this.availableCars.splice(this.findIndex(this.draggedCar), 1);
            this.draggedCar = null;
        }
    }
    
    findIndex(car: Car) {
        let index = -1;
        for(let i = 0; i < this.availableCars.length; i++) {
            if(car.vin === this.availableCars[i].vin) {
                index = i;
                break;
            }
        }
        return index;
    }

}